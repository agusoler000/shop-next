

//[1,2,3,4,5,...,50]
export const generatePaginatioNumbers = (currentPage:number, totalPages:number) =>{
    // Si el numero total de paginas es 7 o menos
    // Se muestran todas sin puntos suspensivos
    if(totalPages <= 7){
        return Array.from({length:totalPages}, (_,i)=>i+1)
    }

    // Si la pagina actual esta entre las primeras tres paginas
    // Mostrar las primeras 3, puntos suspensivos, y las ultimas 2
    if(currentPage <= 3){
        return [1,2,3,'...', totalPages -1, totalPages]
    }

    // Si la pagina actual esta entre las ultimas 3
    // mostrar las primeras 2, puntos suspensivos, y luego las ultimas 3
    if(currentPage >= totalPages - 2){
        return [1,2,'...',totalPages - 2, totalPages - 1, totalPages]
    }

    // Si la pagina actual esta en otro lugar al medio
    // Mostrar la primera pagina, puntos suspensivos, la pagina actual y vecinos

    return [
        1,
        '...',
        currentPage - 1,
        currentPage,
        currentPage + 1,
        '...',
        totalPages
    ]

}