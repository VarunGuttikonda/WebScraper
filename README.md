# Web Scraping using Azure Functions

- [Web Scraping using Azure Functions](#web-scraping-using-azure-functions)
  - [Introduction](#introduction)
  - [Requirements](#requirements)
  - [Cloning the repository](#cloning-the-repository)
  - [Tools used](#tools-used)
  - [Concepts Involved](#concepts-involved)
  - [Description and Code Configurations](#description-and-code-configurations)
  - [Structure of the Code](#structure-of-the-code)
  - [Notes](#notes)

## Introduction
Many a times, we need datasets to perform data related tasks like data analytics, data cleaning and machine learning as such. Most data science courses taught in college and online just make the dataset available to you.
I wanted to explore the data creation part so I can progress forward in my data science curriculum.  
I can create a dataset using a spreadsheet software but that is very boring and time-consuming. So I wanted to automate this task and also try out Puppeter.  
The site I am scraping is [Naukri](https://www.naukri.com). It is a job aggregator that does not provide any public API for consumption. This makes it the perfect choice for **web scraping**.

*This project was made as a part of the assesment of my Cloud Computing class.*

## Requirements
1. NodeJS Runtime
2. npm (Node Packet Manager)
3. Chromium or Chrome Browser (You don't have to install them seperately if you don't have them already. Installing the package automatically installs the browser)
4. Azure Account

## Cloning the repository
If you wanna try this on your computer, clone the repository and install the dependencies using `npm` or `yarn`
````bash
git clone https://github.com/VarunGuttikonda/WebScraper.git  
cd WebScraper  
npm install
````
## Tools used
1. Puppeteer  
A NodeJS library to run chrome in headless mode and automate it using the `DevTools` protocol
2. Objects-to-csv  
A library to convert `JSON` objects into `CSV` strings and vice-versa
````bash
npm install puppeteer objects-to-csv
````

## Concepts Involved
1. `async/await` from JavaScript
2. `ElementHandle` and `JSHandle` from Puppeteer
3. `Connection Strings` and `Bindings` from Azure Functions

## Description and Code Configurations
Azure Functions is a Functions-as-a-Service application from Microsoft Azure. It provides **serverless** compute options to perform computations that can be written as a single function.  
The following files serve as the configuration of this project:  
1. `function.json` - Defines the properties of functions like names of the bindings, type of the bindings and their connection strings along with their direction ie binding is input or output. **Should be defined for each function seperately**
2. `host.json` - Describes the properties of the host to which the function will be deployed. Details like packages to be installed, extensions to use are a part of this file
3. `local.settings.json` - Contains the metadata used by **Azure Functions Core Tools** to assist the developer in **testing the app**
4. `package.json` - Contains the metadata of the project like name,author, **GitHub** link, packages used etc
5. `.gitignore` - Has a list of file names that the VCS (Git) shouldn't be tracking

## Structure of the Code
1. `scrape.js` - Exports the main scrape function named as `scrape`. This function takes care of creating the `Browser` and `Page` objects. It later then scrapes all the jobs on the site
2. `constants.js` - This file contains all the configurations like `HTML Selectors`, config file for `Browser` object etc.
3. `utils.js` - Has utilities for error hanlding and printing to the console
4. `scrapeUtils.js` -  Contains the code for navigating, clicking and scraping the website that were used in the `scrape` function

## Notes
> This application was deployed to Azure Functions. If you want to deploy it to any other cloud platform, please use the `scrape.js,constants.js,scrapeUtils.js and utils.js` as the base files. These export the scraping functionality.