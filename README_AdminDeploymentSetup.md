# First Time Heroku Setup

1. Navigate to [heroku.com](https://www.heroku.com)
1. [Sign up](https://signup.heroku.com/) for an account or [log in](https://id.heroku.com/)
1. Click "Create New App"
1. Choose your Heroku App name and Create App.
1. From your app's Heroku dashboard, select Overview - Configure Add-ons - Search for postgres - Add Heroku Postgres
  - We recommend selecting Hobby Tier for Day 1 and upgrading as your org sees fit in the future.

To deploy your app for the first time and on future commits, setup Continuous Integration via CircleCI:
- [Setup CircleCI](README_AdminCISetup.md)
