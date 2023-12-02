# 🏋️‍♂️ Fitness Exercise Scraping Webapp
This web application scrapes various fitness websites to gather data on different exercises and their corresponding muscle groups. It aggregates this data to provide a comprehensive overview of your training plan, highlighting the percentage of muscle groups targeted in your workouts.

# 🌟 Features
- Web scraping functionality to gather exercise data.
- Dynamic aggregation of muscle group data.
- User-friendly interface to create and modify training plans.
- Comprehensive analytics on muscle group targeting.

# 🛠️ Tech Stack
This project uses:
- MySql
- Mongodb
- Django
- Vite
- React
- Typescript
- Beautiful Soup

# ✏️ Getting Started

- Create new `.env` file with your msql and mongodb credentials (see `.env.local` for exact credentials)
- `pipenv shell` - This will create a new env for the project.
- `pipenv install` - This will build/install the project dependencies of backend services
- `python backend/manage.py runserver` - Run this for check if server it's ok
- `npm run dev` - Run this for the frontend to run locally

# ❓ Potential Issues
If you have problems with a CORS problem check the following:
- Make sure url is `http://localhost:8000` not `http://127.0.0.1:8000`

If you have a problem with running the backend run the following command:
```pipenv run python backend/manage.py runserver```
