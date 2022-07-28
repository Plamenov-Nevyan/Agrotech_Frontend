export const filterByCategory = (category, publications) => {
    return publications.filter(publication => publication.publicationType === category)
} 