export type DefaultRootType = 'workflows' | 'executors' | 'root' | 'boots'

export type ConfigurePath<RootType = DefaultRootType> {
    root: RootType;
    expressions: Array<number | string>;

}

export type WithConfigurePath<RootType = DefaultRootType> {
    configurePath: ConfigurePath<RootType>
}

