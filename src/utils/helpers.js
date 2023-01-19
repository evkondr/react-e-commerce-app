export const formatPrice = (number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(number / 100)
};

export const getUniqueValues = (data, type) => {
    //this function creates new array of object's value by field name and sets new array of unique values
    let arrOfValues = data.map(item => item[type])
    if(type === 'colors'){
        arrOfValues = arrOfValues.flat()
    }
    const unique = ['все', ...new Set(arrOfValues)]
    return unique;
};
