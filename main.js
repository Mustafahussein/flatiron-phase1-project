console.log('main.js connected');

const searchTermsInput = document.body.querySelector("#search-terms");

const getMealCategories = async () => {
    const getMealCategoriesApiURL = "https://www.themealdb.com/api/json/v1/1/categories.php"

    //If I don't want to use the awaith method like the video, I can use the .then lie below:
    //const response = await fetch(getMealCategoriesApiURL).then(response => response.json())
    const response = await fetch(getMealCategoriesApiURL)

    const data = response.json()

    console.log(data)
}

const handleFormInputFocus = async () => {
    console.log(`focus occured`);

    await getMealCategories();
}

searchTermsInput.addEventListener('focus', handleFormInputFocus);
