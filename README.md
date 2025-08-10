# 🧪 OpenCart Playwright MCP + Copilot Automation Framework

This project automates test cases for the **OpenCart demo site** using **Microsoft Playwright** with **Model Context Protocol (MCP)** and **GitHub Copilot**.
It follows the **Page Object Model (POM)** design pattern and supports AI-assisted test creation via Copilot prompts.

---

## 🔧 Tech Stack

| Tool / Library               | Purpose                                        |
| ---------------------------- | ---------------------------------------------- |
| JavaScript / Node.js         | Programming Language                           |
| Playwright                   | UI Automation                                  |
| MCP (Model Context Protocol) | AI-powered test creation & browser interaction |
| GitHub Copilot               | Natural language → test script generation      |
| Allure / HTML Reports        | Test Reporting                                 |
| Jenkins                      | Continuous Integration                         |
| Dotenv                       | Environment variable management                |

---

## 🧪 Test Cases Included

* `TC001_AccountRegistrationTest`
* `TC002_LoginTest`
* `TC003_LoginDDT`
* `TC004_LogOutTest`

*(Data-driven tests are powered by external test data files in `testsData/`.)*

---

## 📁 Folder Structure

| Folder / File       | Purpose                                          |
| ------------------- | ------------------------------------------------ |
| `PageObjects/`      | Page Object Model classes for each OpenCart page |
| `TestCases/`        | Playwright test scripts                          |
| `fixtures/`         | Test setup data and reusable configs             |
| `logs/`             | Execution logs                                   |
| `testsData/`        | Test data files (JSON/Excel/CSV)                 |
| `utils/`            | Helper functions and utilities                   |
| `.env`              | Environment variables (e.g., URLs, credentials)  |
| `Jenkinsfile`       | Jenkins CI pipeline config                       |
| `config.properties` | Test configurations                              |
| `global-setup.js`   | Global Playwright setup script                   |

---

## ▶️ How to Run

### 🟢 Option 1: Using npm

```bash
# Install dependencies
npm install

# Run all tests
npx playwright test

# Run a specific test
npx playwright test TestCases/TC001_AccountRegistrationTest.spec.js
```

---

### 🟢 Option 2: Using Jenkins

1. Create a new Jenkins pipeline job.
2. Set **GitHub repo URL** to:

   ```
   https://github.com/jackiebharathi/opencart-playwright-mcp-copilot.git
   ```
3. In the pipeline config, add:

   ```bash
   npm install
   npx playwright test
   ```
4. Save and build the job.

---

## 📊 Reporting

* Playwright HTML report:

  ```bash
  npx playwright show-report
  ```
* Allure report (if configured):

  ```bash
  allure serve allure-results
  ```

---

## 💡 MCP + Copilot Highlights

* **MCP Server** enables Playwright to be controlled by GitHub Copilot.
* You can write natural language prompts in VS Code and Copilot will generate working Playwright test scripts.
* Great for **black-box testing** without direct source code access.

---
