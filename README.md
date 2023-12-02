# 🏋️‍♂️ Fitness Exercise Scraping Webapp
![demovid](https://github.com/RestartDK/fitnesswebapp/assets/58006998/2ec909cc-1334-447e-a9ea-ce90409bfdae)
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

Create a new shell for the project.
```bash
pipenv shell
```

Build/install the project dependencies of backend services
```bash
pipenv install
```

Run this command for the backend to run locally
```bash
python backend/manage.py runserver
```

Run this command for the frontend to run locally
```bash
npm run dev
```

# ❓ Potential Issues
If you have problems with a CORS problem check the following:
- Make sure url is `http://localhost:8000` not `http://127.0.0.1:8000`

If you have a problem with running the backend run the following command:
```bash
pipenv run python backend/manage.py runserver
```
