export type RecursiveBuilderConfig = {
    builder: Function,
    dependClasses?: {
        [k in string]: Function
    }
}

export type RecursiveBuilderArgs = {
    args?: any
    dependArgs?: {
        [k in string]: RecursiveBuilderArgs
    }


}