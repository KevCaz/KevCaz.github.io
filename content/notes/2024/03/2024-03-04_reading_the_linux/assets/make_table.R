library(yaml)
library(dplyr)
library(knitr)
library(clipr)

codify <- function(x) {
    if (length(x) == 1 && x == "") {
        ""
    } else {
        paste0("`", x, "`")
    }
}

read_yaml("commands.yaml") |>
    lapply(
        \(x) data.frame(
            Command = codify(x$cmd),
            Description = x$desc,
            Options = paste(codify(x$opt), collapse = ", "),
            Category = x$categ,
            Usage = rep(":star:", x$use)  |> paste(collapse = " ")
        )
    ) |>
    do.call(what = bind_rows) |>
    arrange(Category, desc(Usage)) |>
    kable() |>
    write_clip()
