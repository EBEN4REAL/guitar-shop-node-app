
   export const  validate = (element, formData=[]) => {
   let error = [true, ''];

    if(element.validation.email){
         const valid = /\S+@\S+\.\S+/.test(element.value);
         const message = !valid ? 'Must be a valid email' : '';
         error = !valid ? [valid, message] : error;
    }

    if(element.validation.confirm){
        const valid = element.value.trim() === formData[element.validation.confirm].value;
        const message = !valid ? 'Passwords do not match' : '';
        error = !valid ? [valid, message] : error;
    }

    if(element.validation.required){
        const valid = element.value.trim() !== '';
        const message = !valid ? 'This field is required' : '';
        error = !valid ? [valid, message] : error;

    }
    return error;
}


 export const update = (element, formData, formName) => {
    const newFormData = {
        ...formData,
    }
    const newElement  = {
        ...newFormData[element.id]
    }
    newElement.value = element.event.target.value;
    
    if(element.blur){
        let validData = validate(newElement, formData);
        newElement.valid = validData[0];
        newElement.validationMessage = validData[1];
    }
    newElement.touched = element.blur;
    newFormData[element.id] = newElement;

    return newFormData;
}


export const generateData = (formData, formName) => {
    let formToSubmit = {};
    for(let formField in formData){
        if (formField !== 'confirmPassword'){
            formToSubmit[formField] = formData[formField].value;
        }
    }
    return formToSubmit;
}


export const isFomValid = (formData, formName) => {
    let formIsValid = true;

    for(let formField in formData){
        formIsValid = formData[formField].valid && formIsValid 
    }
    console.log(formIsValid);

    return formIsValid;
}

export const populatedOptionFields = (formData, arrayData=[] , field) => {
     const newArray = [];
     const newFormData = {...formData};

     arrayData.forEach(item => {
         newArray.push({name: item.name, value: item._id})
     })

     newFormData[field].elementConfig.options = newArray;
     console.log(newFormData);
     return newFormData
}
export const  resetFields = (formData, formName) => {
    const newFormData = {...formData};

    for(let key in newFormData){
        if(key === 'images'){
            newFormData[key].value = [];
        }else{
            newFormData[key].value = '';
        }
        
        newFormData[key].valid = false;
        newFormData[key].touched = false;
        newFormData[key].validationMessage = "";
    }

    return newFormData;
}
