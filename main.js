console.log('main.js connected')

const handleFormInputFocus = () => {
    console.log(`focus occured`)
}

const searchTermsInput = document.body.querySelector("#search-terms")
searchTermsInput.addEventListener('focus', handleFormInputFocus)
