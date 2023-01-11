Rails.application.routes.draw do
  
  post 'login', to: 'sessions#create'
  post 'logout', to: 'sessions#destroy'
  post 'signup', to: 'users#create'
  get 'patterns/explore', to: "patterns#explore"
  get 'patterns/filters', to: "patterns#filters"

  # default routes
  resources :patterns, only: [:index, :show] do
    get "/diagram", to: "patterns#diagram"
  end
  resources :projects, only: [:show]
  resources :users, only: [:show] do
    resources :patterns, only: [:index]
    resources :projects, only: [:index, :create]
  end


  # fallback route
  get '*path',
    to: 'fallback#index',
    constraints: ->(req) { !req.xhr? && req.format.html? }
end
