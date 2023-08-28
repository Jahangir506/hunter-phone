const LoadPhone = async (searchText='13', isShowAll) => {
    const res = await fetch (`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json()
    const phones = data.data
    // console.log(phones);
    displayPhones(phones, isShowAll)
}

const displayPhones = (phones, isShowAll) => {

    const phoneContainer = document.getElementById('phone-container')
    phoneContainer.textContent = ''

    const showAllProductsBtn = document.getElementById('show-all-product-btn')
    if(phones.length > 10 && !isShowAll){
      showAllProductsBtn.classList.remove('hidden')
    }else{
      showAllProductsBtn.classList.add('hidden')
    }
    // console.log('is show All',isShowAll);

   if(!isShowAll){
    phones = phones.slice(0,10)
   }

    phones.forEach(phone => {
        // console.log(phone);
        
        const phoneCard = document.createElement('div');
        phoneCard.classList = (`card bg-gray-100 p-4 shadow-xl`);
        phoneCard.innerHTML = `
        <figure class="px-10 pt-10">
        <img
          src="${phone.image}"
          alt="Shoes"
          class="rounded-xl"
        />
      </figure>
      <div class="card-body items-center text-center">
        <h2 class="card-title">${phone.phone_name} </h2>
        <p>${phone.slug} </p>
        <div class="card-actions">
          <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
        </div>
      </div>
        `;
        phoneContainer.appendChild(phoneCard)
    });
    toggleLoadingSpinner(false)
}

const handleSearch = (isShowAll) => {
  toggleLoadingSpinner(true)
   const searchField = document.getElementById('search-field')
   const searchText = searchField.value;
  //  console.log(searchText);
   LoadPhone(searchText, isShowAll)
}

const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById('loading-spinner')
  if(isLoading){
    loadingSpinner.classList.remove('hidden')
  }else{
    loadingSpinner.classList.add('hidden')
  }
}

const handleShowAll = () => {
  handleSearch(true)
}


const handleShowDetails = async (id) => {
  // console.log(id);
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const data = await res.json();
 const phone = data.data

  showPhoneDetails(phone)
}

const showPhoneDetails = (phone) => {
  const phoneName = document.getElementById('show-details-phone-name');
  phoneName.innerText = phone.name

  const showImage = document.getElementById('show-image')
  showImage.innerHTML = `
  <img src="${phone.image}" />
  `

  const showDetailsContainer = document.getElementById('show-details-container')
  showDetailsContainer.innerHTML = `
   
    <p><span class="text-lg font-medium">Storage: </span>${phone.mainFeatures?.storage}</p>
    <p><span class="text-lg font-medium">Display-size: </span>${phone.mainFeatures?.displaySize}</p>
    <p><span class="text-lg font-medium">Chipset: </span>${phone.mainFeatures?.chipSet}</p>
    <p><span class="text-lg font-medium">Memory: </span>${phone.mainFeatures?.memory}</p>
    <p><span class="text-lg font-medium">Slug: </span>${phone.slug}</p>
    <p><span class="text-lg font-medium">Release Date: </span>${phone.releaseDate}</p>
    <p><span class="text-lg font-medium">brand: </span>${phone.brand}</p>
    <p><span class="text-lg font-medium">GPS: </span>${phone.others?.GPS}</p>
  `;


  show_details_showModal.showModal()
}

LoadPhone()