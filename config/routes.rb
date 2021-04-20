Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
  	namespace :v1 do
  		resources :contex do 
  			resources :lyrics 
  		end
  	end
  end
   get 'homepage/index'
   root 'homepage#index'
   get '*path', to: 'homepage#index', constraints: ->(request) do
    !request.xhr? && request.format.html?
   end
end
