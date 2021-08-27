## Setup [CircleCI](https://circleci.com/vcs-authorize/)

1. If you have not yet, create an account on CircleCI by navigating to the signup page and clicking on [Sign Up with GitHub](https://circleci.com/signup/).
1. Navigate to the CircleCI [Project Page](https://app.circleci.com/projects/).
1. <strong>IMPORTANT</strong>: if you created your new repository under an organization you will need to select the organization name when you login to CircleCI.
1. Once on the Project page, find the project you are using, in our case `<YOUR-NEW-REPO-NAME>`, and click Set Up Project.
1. Select "If you already have .circleci/config.yml in your repo, select the branch it's on to start building", and type `main` which will be the default branch name
1. Click Let's Go and watch your new CircleCI workflow run which will likely fail the first time
1. From the dashboard for the Pipeline for your new project, select Project Settings (top right) - Environment variables
1. Add Heroku Environment Variables ([Heroku Setup](README_AdminDeploymentSetup.md) must be completed)
  - [Log In to Heroku](https://id.heroku.com/)
  - HEROKU_APP_NAME: This is the name of your Heroku application (i.e. my-heroku-node-api). When you log in to Heroku, make sure you select the organization you've created this project in and you should see your app name in your dashboard.<br>
  - HEROKU_API_KEY: Your Heroku account API key. This can be found under the Account tab (top right) of your Heroku account under Account Settings. Scroll down the Account tab to the API Key section and click Reveal to copy your API Key.
  - WEB_URL: This will be the public URL that your api can receive requests on. You can find it by clicking into your app name in the home dashboard, and clicking Open App (top right). Please do not include the trailing `/`. (i.e. https://my-heroku-node-api.herokuapp.com)

<strong>CI/CD is now set up for subsequent commits to your repo's `main` branch.</strong>
 - If your CircleCI workflow failed before you were able to add your Heroku credentials, you can still deploy your app the first time without needing to commit. From the dashboard for the Pipeline for your new project, re-run the failed `heroku/deploy-via-git` job which now has the correct credentials.