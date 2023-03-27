Rails.application.routes.draw do
  
  post 'login', to: 'sessions#create'
  post 'logout', to: 'sessions#destroy'
  post 'signup', to: 'users#create'
  get 'patterns/explore', to: "patterns#explore"
  get 'patterns/filters', to: "patterns#filters"
  get 'projects/filters', to: "projects#filters"
  get 'projects/sorting', to: "projects#sort_options"

  # default routes
  resources :crafts, only: [:index]
  resources :patterns, only: [:index, :show, :create] do
    get "/diagram", to: "patterns#diagram"
  end
  resources :projects, only: [:show, :update] do
    resources :timers, only: [:index]
  end
  resources :statuses, only: [:index]
  resources :timers, only: [:create, :destroy, :update]
  resources :users, only: [:show] do
    resources :patterns, only: [:index]
    resources :projects, only: [:index, :create]
  end


  # fallback route
  get '*path',
    to: 'fallback#index',
    constraints: ->(req) { !req.xhr? && req.format.html? }
end
