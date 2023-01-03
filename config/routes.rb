Rails.application.routes.draw do
  
  post 'login', to: 'sessions#create'
  post 'signup', to: 'users#create'

  # fallback route
  get '*path',
    to: 'fallback#index',
    constraints: ->(req) { !req.xhr? && req.format.html? }
end
