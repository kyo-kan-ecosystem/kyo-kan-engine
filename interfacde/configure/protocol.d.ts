export type DefaultRootType = 'workflow' | 'executor' | 'root'

export type ConfigurePath<RootType = DefaultRootType> {
    root: RootType;
    expressions: Array<number | string>;

}

export type WithConfigurePath<RootType = DefaultRootType> {
    configurePath: ConfigurePath<RootType>
}

