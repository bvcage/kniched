Rails.application.routes.draw do
  
  post 'login', to: 'sessions#create'
  post 'logout', to: 'sessions#destroy'
  post 'signup', to: 'users#create'

  # default routes
  resources :patterns, only: [:show]
  resources :projects, only: [:show]
  resources :users, only: [:show] do
    resources :patterns, only: [:index]
    resources :projects, only: [:index]
  end


  # fallback route
  get '*path',
    to: 'fallback#index',
    constraints: ->(req) { !req.xhr? && req.format.html? }
end
