export default function validateCreateLink(values) {
    let errors = {};

    // Description errors
    if (!values.description) {
        errors.description = 'Description required';    
    } else if (values.description.length < 10) {
        errors.email = 'Description must be at least 10 characters';
    }

    // Password errors
    if (!values.url) {
        errors.url = 'URL required';
    } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(values.url)) {
        errors.url = 'Invalid URL';
    }

    return errors;    
}
