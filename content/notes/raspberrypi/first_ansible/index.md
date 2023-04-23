---
title: Ansible playbook for setting up Nextcloud on a Raspberry Pi 3B
date: 2023-04-23
tags: [raspberry pi, ansible, nextcloud] 
---


I recently got a new SD card for my Raspberry Pi 3B, so I had to reinstall Nextcloud and I took the opportunity to create an [Ansible](https://www.ansible.com/) playbook for it. I basically went through the steps described in my previous note ['Nextcloud server on a Raspberry Pi 3B']({{< ref "/notes/raspberrypi/nextcloud_server" >}} "Go to this post") and I turned them into a playbook. If you want to get an idea of what is Ansible, check out the [Wikipedia article](https://en.wikipedia.org/wiki/Ansible_(software)) and for what follows, let's keep in mind the following:

> Ansible helps to manage multiple machines by selecting portions of Ansible's inventory stored in simple plain text files. The inventory is configurable, and target machine inventory can be sourced dynamically or from cloud-based sources in different formats (YAML, INI).



# Pre-requisites

### Set-up the SD card with Raspberry Pi OS

1. Install Raspberry Pi OS which is straightforward with [Imager](https://www.raspberrypi.com/software/), you will follow several steps in one of then you can 
require a ssh-server to be set up.  

```sh 
sudo apt install rpi-imager
```

### Use a static ID 

This is done by editing `/etc/dhcpcd.conf` see ['How to Setup a Raspberry Pi Static IP Address'](https://pimylifeup.com/raspberry-pi-static-ip-address/).


### Install Ansible

On my Ubuntu 22.04 machine, I did the following

```sh
$ apt install ansible 
```

to install Ansible and then 

```sh
$ ansible-galaxy collection install community.mysql
```

to install the Ansible modules for mySQL used to install the [MariaDB database for Nextcloud](https://docs.nextcloud.com/server/latest/admin_manual/configuration_database/linux_database_configuration.html).



# My playbook 

Below are the two YAML files I used to reinstall Nextcloud. In both files I added links to documentation pages and Stack Overflow answers that helped develop my playbook. There is also a section 'Notes' below that provides further details on specific topics. 

## Inventory file

In my case the inventory is pretty simple, my Ubuntu machine was the *controller node* (in Ansible jargon) and my Raspberry Pi 3B was the *managed node* named 'my_raspberry' below. Note that the content of the inventory file can be directly integrated in the playbook (I personally prefer having two files). 

```yaml
all:
  hosts:
    my_raspberry:
      remote_user: pi_user
      ansible_host: 192.168.XXX.XXX
  vars:
    ansible_connection: ssh
    ansible_ssh_user: pi_user
    ansible_ssh_private_key_file: /home/user/.ssh/id_rsa
    ansible_python_interpreter: /usr/bin/python3
    # encrypted password for the nextcloud database
    # https://docs.ansible.com/ansible/latest/vault_guide/vault_encrypting_content.html
    # see section 'note below'
    db_password: !vault |
          $ANSIBLE_VAULT;1.1;AES256
          38623364643532613461383939663739356439396261623465626136646365336338633463636562
          3363343831383335623832643032323036653162346536330a373636333133376466653561346333
          30383661663833396433313465353238343532363763663861643637373836363233653631346432
          3533393164353365340a623438626462356437633334653136346236316531633039626331373833
```

## Playbook

This playbook reproduces the steps describes in https://pimylifeup.com/raspberry-pi-nextcloud-server/. Note that I added tags to identify different parts of the installation. 

```yaml
- name: Set up basic
  become: yes
  hosts: all
  tasks:
  # update+ upgrde apt 
  # use tags never to not do it, use always when upgrade is desired
  # https://docs.ansible.com/ansible/latest/collections/ansible/builtin/apt_module.html
  - name: Update and upgrade
    apt:
      update_cache: true
      cache_valid_time: 7200
      upgrade: dist
      tags: never
  #--------------------- PHP
  # https://www.tal.org/tutorials/setup-php-7-or-8-apache-raspberry-pi
  # https://pimylifeup.com/raspberry-pi-latest-php/
  - name: Install lsb-release
    apt:
        pkg:
          - lsb-release
        state: latest
        cache_valid_time: 7200
    tags: php
  # https://docs.ansible.com/ansible/latest/collections/ansible/builtin/shell_module.html
  - name: Get distribution name
    shell:
      cmd: lsb_release -cs
    register: command_output
    tags: php
  # create variable host_release_name
  # https://docs.ansible.com/ansible/latest/collections/ansible/builtin/set_fact_module.html
  - name: Create host_release_name variable
    set_fact:
      host_release_name: "{{ command_output.stdout }}"
    tags: php
  # https://docs.ansible.com/ansible/latest/collections/ansible/builtin/get_url_module.html
  - name: Get GPG key for PHP repository 
    get_url:
      url: https://packages.sury.org/php/apt.gpg
      dest: /usr/share/keyrings/suryphp-archive-keyring.gpg
    tags: php
  - name: Add PHP repository
    apt_repository:
      repo: "deb [signed-by=/usr/share/keyrings/suryphp-archive-keyring.gpg] https://packages.sury.org/php/ {{ host_release_name }} main" 
      state: present
    tags: php
  - name: Install php8.1
    apt:
      pkg:
        - php8.1
        - php8.1-gd 
        - php8.1-sqlite3 
        - php8.1-curl 
        - php8.1-zip 
        - php8.1-xml 
        - php8.1-mbstring 
        - php8.1-mysql
        - php8.1-bz2 
        - php8.1-intl 
        - php8.1-smbclient 
        - php8.1-imap
        - php8.1-gmp 
        - php8.1-bcmath 
      state: latest
      cache_valid_time: 7200
    tags: php
  # https://docs.ansible.com/ansible/latest/collections/ansible/builtin/lineinfile_module.html
  - name: Change PHP post_max_size
    lineinfile:
      path: /etc/php/8.1/apache2/php.ini
      regexp: '^post_max_size ='
      line: 'post_max_size = 2048M'
    tags: php
  - name: Change PHP upload_max_filesize
    lineinfile:
      path: /etc/php/8.1/apache2/php.ini
      regexp: '^upload_max_filesize ='
      line: 'upload_max_filesize = 2048M'
    tags: php
  #--------------------- APACHE 2
  - name: Install apache 2
    apt:
      pkg:
        - apache2
        - libapache2-mod-php8.1
      state: latest
      cache_valid_time: 7200
    tags: apache
  # https://docs.ansible.com/ansible/latest/collections/ansible/builtin/service_module.html
  - name: restart apache2
    service: 
      name: apache2
      state: restarted
    tags: apache
  #--------------------- MYSQL
  # https://pimylifeup.com/raspberry-pi-mysql/
  - name: Install MySQL
    apt:
      pkg:
        - mariadb-server
        - python3-pymysql 
        - default-libmysqlclient-dev
      state: latest
    tags: sql
  # https://stackoverflow.com/questions/25136498/ansible-answers-to-mysql-secure-installation
  # https://docs.ansible.com/ansible/latest/collections/community/mysql/mysql_db_module.html
  # /run/mysqld/mysqld.sock is very important on Linux otherwise errors are thrown
  - name: Removes test database
    community.mysql.mysql_db:
      name: test 
      state: absent
      login_unix_socket: /run/mysqld/mysqld.sock
    tags: sql
  # https://docs.ansible.com/ansible/latest/collections/community/mysql/mysql_user_module.html
  - name: Removes all anonymous accounts
    community.mysql.mysql_user:
      name: ''
      host_all: true
      login_unix_socket: /run/mysqld/mysqld.sock
      state: absent
    tags: sql
  - name: Create nextclouddb
    community.mysql.mysql_db:
      name: nextclouddb
      login_unix_socket: /run/mysqld/mysqld.sock
      state: present
    tags: sql
  - name: Create nexcloudadmin user
    community.mysql.mysql_user:
      name: nextcloudadmin
      password: "{{ db_password }}"
      priv:
        'nextclouddb.*': 'ALL,GRANT'
      login_unix_socket: /run/mysqld/mysqld.sock
      state: present
    tags: sql
  #--------------------- NEXTCLOUD
  - name: Download nextcloudadmin
    get_url:
      url: https://download.nextcloud.com/server/releases/latest.tar.bz2
      dest: /tmp/latest_nextcloud.tar.bz2
    tags: nextcloud
  # https://docs.ansible.com/ansible/latest/collections/ansible/builtin/unarchive_module.html
  # NB: this takes some time cause of all work done to ensure idempotency, 
  # see https://github.com/ansible/ansible/issues/38267
  - name: Extract nextcloud archive
    unarchive:
      src: /tmp/latest_nextcloud.tar.bz2
      creates: /var/www/nextcloud/
      dest: /var/www
      copy: no
      owner: www-data 
      group: www-data
      mode: "750"
    tags: nextcloud
  # https://docs.ansible.com/ansible/latest/collections/ansible/builtin/copy_module.html
  - name: Copy local nextcloud.conf 
    copy:
      src: nextcloud.conf
      dest: /etc/apache2/sites-available/
      owner: root
      group: root
      mode: '0644'
      backup: yes
    tags: nextcloud
  #--------------------- NEXTCLOUD PART 2
  # https://serverfault.com/questions/1064669/mv-command-did-not-rename-but-move-into-existing-directory-from-ansible
  # https://docs.ansible.com/ansible/latest/collections/ansible/builtin/stat_module.html
  - name: Check if new data folder
    stat:
      path: /var/nextcloud/data
    register: dest_folder
    tags: nextcloudp2
  - name: Move data directory
    shell: 
      cmd: |
        mkdir -p /var/nextcloud
        mv /var/www/nextcloud/data /var/nextcloud/data
      warn: false
    when: not dest_folder.stat.exists
    tags: nextcloudp2
  # https://docs.ansible.com/ansible/latest/collections/ansible/builtin/file_module.html
  - name: Ensure that data has the right ownership
    file: 
      path: /var/nextcloud/data
      state: directory
      recurse: yes
      owner: www-data
      group: www-data 
    when: not dest_folder.stat.exists
    tags: nextcloudp2
  # https://docs.ansible.com/ansible/latest/collections/ansible/builtin/lineinfile_module.html
  - name: Redirect data folder properly
    lineinfile:
      path: /var/www/nextcloud/config/config.php
      regexp: "datadirectory"
      line: "'datadirectory' => '/var/nextcloud/data',"
      backup: yes
    tags: nextcloudp2
  - name: Enable nextcloud
    command: a2ensite nextcloud.conf
    tags: nextcloudp2
  #--------------------- UFW
  - name: Install the Uncomplicated Firewall (ufw)
    apt:
      pkg:
        - ufw
      state: latest
      update_cache: true
    tags: ufw
  - name: Allow port 80 and 443
    command: ufw allow 80,443/tcp
    tags: ufw
  #--------------------- CERTBOT
  - name: Install certbot
    apt: 
      pkg:
        - python3-certbot-apache
      state: latest
      update_cache: true
    tags: certbot
```

## Play it 

To run the entire playbook, I run the following command: 

```sh
$ ansible-playbook --vault-password-file psw_tmp --inventory-file inventory.yaml tasks.yaml
```

Since I added tags, I can easily target a specific part of the installation, e.g.

```sh
$ ansible-playbook --vault-password-file psw_tmp --inventory-file inventory.yaml tasks.yaml --tags "apache"
```

or a combination of parts:

```sh
$ ansible-playbook --vault-password-file psw_tmp --inventory-file inventory.yaml tasks.yaml --tags "apache,php"
```



## Notes 

### Encryption 

I run the following command to encrypt `db_password`: 

```sh
$ cat db_password_file | ansible-vault encrypt_string --vault-password-file psw_tmp --stdin-name 'db_password'
```

where `db_password_file` is a file containing the password for the database and `psw_tmp` is a file including the password used for encryption (see [Ansible vault](https://docs.ansible.com/ansible/latest/vault_guide/index.html) for further details).

### Local files

There are 3 files used in this playbook that I am not sharing: 

- `db_password_file` (see above)
- `psw_tmp` (see above)
- `nextcloud.conf` (see [Installation on Linux](https://docs.nextcloud.com/server/latest/admin_manual/installation/source_installation.html))


### Issues with MariaDB installation

As I was working on my playbook I did something wrong with the root user and as a result I was not able to install the database properly, so I had to remove mariad-sb server:

```sh 
$ apt purge mariadb-server 
$ apt autoremove
```

But I also had to remove other packages which were not purged, I identified them with the following:

```sh 
$ sudo dpkg -l | grep mariadb 
```

One important line with community.mysql modules on Linux is:

```sh
login_unix_socket: /run/mysqld/mysqld.sock
```

Not entirely sure I understand why, but see issue [#358](https://github.com/ansible-collections/community.mysql/issues/358) on GitHub.


### Post actions 

This playbook does not complete the installation, there are several steps to carry out afterward, in a nutshell: 

1. adding your domain in `trusted_domains` in `/var/www/nextcloud/config/config.php`;
1. grabbing a SSL certificate, basically running `sudo certbot --apache`;
2. setting Nextcloud (admin account, applications, etc.).


### Ansible 

Ansible is great and fairly easy to use, which amazes me given all the work it does.



# References

There are tons of good posts about Ansible online and the [documentation](https://docs.ansible.com/ansible/) is thorough, below are listed the references I used as I was developing my playbook.

### Get started

Three posts that were very helpful to get me started:

- [Manage your Raspberry Pi fleet with Ansible](https://opensource.com/article/20/9/raspberry-pi-ansible);
- [Ansible ping](http://hackerpublicradio.org/eps.php?id=3080);
- [How to manage a Raspberry Pi Cluster with Ansible](https://seanjziegler.com/managing-an-rpi-cluster-with-ansible/).


### Ansible documentation pages 

This is a table that includes all pages listed in the playbook above as comments and additional pages in the documentation that I found very useful to develop this playbook.

|Type            | Page                                                                                                                          |
|:---------------|:------------------------------------------------------------------------------------------------------------------------------|
|General         |Create your [First playbook](https://docs.ansible.com/ansible/latest/network/getting_started/first_playbook.html)              |
|General         |Learn about [privilege escalation](https://docs.ansible.com/ansible/latest/playbook_guide/playbooks_privilege_escalation.html) |
|General         |Learn about [Ansible vault](https://docs.ansible.com/ansible/latest/vault_guide/index.html)                                    |
|General         |Learn how to use [tags](https://docs.ansible.com/ansible/latest/playbook_guide/playbooks_tags.html)                            |
|General         |Learn about [Ansible vault](https://docs.ansible.com/ansible/latest/vault_guide/index.html)                                    |
|Built-in        | Module [apt](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/apt_module.html)                             |
|Built-in        | Module [shell](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/shell_module.html)                         |
|Built-in        | Module [set_fact](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/set_fact_module.html)                   |
|Built-in        | Module [get_url](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/get_url_module.html)                     |
|Built-in        | Module [service](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/service_module.html)                     |
|Built-in        | Module [unarchive](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/unarchive_module.html)                 |
|Built-in        | Module [stat](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/stat_module.html)                           |
|Built-in        | Module [copy](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/copy_module.html)                           |
|Built-in        | Module [file](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/file_module.html)                           |
|Built-in        | Module [lineinfile](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/lineinfile_module.html)               |
|Community MySQL |Module [mysql_db](https://docs.ansible.com/ansible/latest/collections/community/mysql/mysql_db_module.html)                    |
|Community MySQL |Module [mysql_user](https://docs.ansible.com/ansible/latest/collections/community/mysql/mysql_user_module.html)                |
