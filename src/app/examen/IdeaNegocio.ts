export interface IdeaNegocio {
    id: number,
    titulo: string,
    descripcion: string,
    categoria: "tecnología" | "salud" | "educación",
    estado: "borrador" | "validando" | "descartada"
}