export class ArticuloExt {
    id: number = -1;
    codigo?: string;
    descripcion?: string;
    descripcionCorta?: string;
    descripcionAlternativa?: string;
    umd: number = -1;
    activo?: boolean; // mismo que act en Articulo?
    observaciones?: string;
    controlLote?: boolean;
    controlCaducidad?: boolean;
    fechaAlta: string = "";
    fechaMod: string = "";
    usuario_Id_Alta: number = -1;
    usuario_Id_Mod: number = -1;
}

export interface ArticuloExtInterface {
    id: number;
    codigo?: string;
    descripcion?: string;
    descripcionCorta?: string;
    descripcionAlternativa?: string;
    umd: number;
    activo?: boolean; // mismo que act en Articulo?
    observaciones?: string;
    controlLote?: boolean;
    controlCaducidad?: boolean;
    fechaAlta: string;
    fechaMod: string;
    usuario_Id_Alta: number;
    usuario_Id_Mod: number;
}

export class Articulo {
    id: number = -1;
    codigo?: string;
    articuloExt_Id: number = -1;
    proveedor_Id?: number = -1;
    propietario_Id: number = -1;
    descripcion?: string;
    descripcionCorta?: string;
    descripcionAlternativa?: string;
    compactarUbicacion?: boolean;
    umd: number = -1;
    observaciones?: string;
    act?: boolean; // mismo que activo en ArticuloExt?
    controlLote?: boolean;
    controlCaducidad?: boolean;
    fechaAlta: string = "";
    fechaMod: string = "";
    usuario_Id_Alta: number = -1;
    usuario_Id_Mod: number = -1;
}

export interface ArticuloInterface {
    id: number;
    codigo?: string;
    articuloExt_Id: number;
    proveedor_Id?: number;
    propietario_Id: number;
    descripcion?: string;
    descripcionCorta?: string;
    descripcionAlternativa?: string;
    compactarUbicacion?: boolean;
    umd: number;
    observaciones?: string;
    act?: boolean; // mismo que activo en ArticuloExt?
    controlLote?: boolean;
    controlCaducidad?: boolean;
    fechaAlta: string;
    fechaMod: string;
    usuario_Id_Alta: number;
    usuario_Id_Mod: number;
}

export class Proveedor {
    id: number = -1;
    codigo?: string;
    nombre?: string;
    cif?: string;
    ean?: string;
    observaciones?: string;
    nodoLogistico_Id: number = -1;
    fechaBaja?: string;
    motivoBaja?: string;
    activo?: boolean;
    fechaAlta: string = "";
    fechaMod: string = "";
    usuario_Id_Alta: number = -1;
    usuario_Id_Mod: number  = -1;
}

export interface ProveedorInterface {
    id: number;
    codigo?: string;
    nombre?: string;
    cif?: string;
    ean?: string;
    observaciones?: string;
    nodoLogistico_Id: number;
    fechaBaja?: string;
    motivoBaja?: string;
    activo?: boolean;
    fechaAlta: string;
    fechaMod: string;
    usuario_Id_Alta: number;
    usuario_Id_Mod: number;
}

export interface PaginatedList{
    TotalItemsCount: number;
    Page: number;
    PageSize: number;
    Items: Proveedor[] | Articulo[] | ArticuloExt[];
}