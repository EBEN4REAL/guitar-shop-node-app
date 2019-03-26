import React from 'react';

const FormField = ({formData, changed, id}) => {
    const showError = () => {
        let errorMessage = null;

        if(formData.validation && !formData.valid){
            errorMessage = (
                <div className="error_label">
                   {formData.validationMessage}
                </div>
            )
        }


        return errorMessage
    }
        

   
    const renderTemplate = () => {
        let formTemplate = null;

        switch(formData.elementType){
            case('input'):
                formTemplate = (
                    <div className="formBlock">
                    {formData.showlabel ? 
                        <div className="label_inputs">{formData.elementConfig.label}</div>
                :null
                }
                        <input
                            {...formData.elementConfig}
                            value={formData.value}
                            onBlur={(event)=> changed({event,id,blur:true})}
                            onChange={(event)=> changed({event,id}) }
                        />
                        {showError()}
                    </div>
                )
                break;
            case("textarea"):
            formTemplate = (
                <div className="formBlock">
                {formData.showlabel ? 
                    <div className="label_inputs">{formData.elementConfig.label}</div>
            :null
            }
                    <textarea
                         {...formData.elementConfig}
                         value={formData.value}
                         onBlur={(event)=> changed({event,id,blur:true})}
                         onChange={(event)=> changed({event,id}) }
                     />
                    {showError()}
                </div>
            )
            break;
            default:
                formTemplate = null;
        }

        return formTemplate;
    }
    return (
        <div>
            {renderTemplate()}
        </div>
    )
}

export default FormField;