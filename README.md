# Expense Tracker
> A MERN web application to track your personal incomes and outcomes for each month

Expense Tracker is a sample expense tracker built with Node Js and Express for the backend, MongoDB as the database, and React Js for the UI.

## 💥 A guide for Contribution

- Take a look at the Existing [Issues](https://github.com/Yossef-Ahmed/expense-tracker/issues) or create your own Issues!
- Wait for the Issue to be assigned to you after which you can start working on it.
- Fork the Repo and create a Branch for any Issue that you are working upon.
- Create a Pull Request which will be promptly reviewed and suggestions would be added to improve it.


## ⭐ Contribution:
**1.** Fork [this](https://github.com/Yossef-Ahmed/expense-tracker) repository.
Click on the <a href="https://github.com/Yossef-Ahmed/expense-tracker"><img src="https://img.icons8.com/ios/24/000000/code-fork.png"></a> symbol at the top right corner.

**2.** Clone the forked repository.

```bash
git clone https://github.com/<your-github-username>/expense-tracker
```

**3.** Navigate to the project directory.

```bash
cd expense-app
```

**4.** Make changes in source code.

**5.** Stage your changes and commit

```bash
#Add changes to Index
git add .

#Commit to the local repo
git commit -m "<your_commit_message>"
```

**7.** Push your local commits to the remote repo.

```bash
git push
```

**8.** Create a [Pull Request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request) !

**9.** **Congratulations!** Sit and relax, you've made your contribution to [Expense Tracker](https://github.com/Yossef-Ahmed/expense-tracker) project.

##  ▶️ How to Run the Project

**1.** Navigate to the project directory.

```bash
cd expense-app
```

**1.** Create a folder called `config`.

**2.** Navigate to the `config` directory & Create a file called `default.json`.

**3.** Put this in the `default.json` file.

```json
{
    "mongoURI": "<Your MongoURI>",
    "jwtSecret": "<The JWT Secret>"
}
```

**4.** Navigate to the project directory again.

```bash
cd ../
```

**5.** Install & Run The Client.

```bash
npm run install-client
npm run client / yarn run client
```

**6.** In Another Bash, Install & Run The Server.

```bash
npm install
npm run server / yarn run server
```
