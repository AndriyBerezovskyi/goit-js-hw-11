import './sass/main.scss';
import ApiService from './js/pixabay'
import template from './templates/template.hbs'
import Notiflix from 'notiflix';


const refs = {
    searchForm: document.querySelector(".search-form"),
    galleryContainer: document.querySelector(".gallery"),
    loadMoreButton: document.querySelector(".load-more"),
}

const apiService = new ApiService;


refs.searchForm.addEventListener('submit', onSearch)
refs.loadMoreButton.addEventListener('click', onLoadMore)

function onSearch(e) {
    clearGalleryContainer( )
    e.preventDefault()
    apiService.query = e.currentTarget.elements.searchQuery.value;
    apiService.resetPage();
    apiService.fetchPictures().then(renderPictures)
     
};

function onLoadMore() {
    apiService.fetchPictures().then(renderPictures)
}

function renderPictures(response) {
    console.log(response)
     
    refs.galleryContainer.insertAdjacentHTML('beforeend', template(response.data.hits))
      
    if (response.data.totalHits === 0) {
        Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    }
    
    else if (apiService.perPage > response.data.hits.length) {
        Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
        hideLoadMoreBtn();
    }
       
    else if (response.data.totalHits > 0) {
        showLoadMoreBtn()
    }
}
 
function clearGalleryContainer() {
    refs.galleryContainer.innerHTML = ''
}

function hideLoadMoreBtn() {
refs.loadMoreButton.classList.add('is-hidden')
}

function showLoadMoreBtn() {
    refs.loadMoreButton.classList.remove('is-hidden')
}