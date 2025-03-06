# Data visualisation engineer 

## Design a Dashboard for Investors and Investments

## Instructions

You aim to conceptualize and design a dashboard that displays key information about
investors and their investments. The idea is that using your expertise, you create a cohesive
visualization that has value, is visually pleasing, and has a good UX.
There are no requirements for what specifically should be shown on screen, we want to assess
your ability to turn raw data into value.
You are expected to deliver a front-end platform in React.js, using D3.js (or a wrapper library
like Nivo) to generate data visualizations. Typescript is optional.

## Final react version preview 

![alt text](<Image 1 - react.png>)

## Preparation

#### Data cleaning and processing
In the [first step](https://observablehq.com/d/5ae7f207809e418b?collection=@sandraviz/liminal) I checked the dataset and variables, afterwards I did some cleaning.

##### Visualisation: Investors (Entity vs. Person)
In the [second step](https://observablehq.com/d/9839cdc79406e156?collection=@sandraviz/liminal) I checked the investors through a ranking visualisation. 

##### Visualisation: Investments
In the [third step](https://observablehq.com/d/1822f94eb67efc32?collection=@sandraviz/liminal) I checked the investment through a ranking visualisation. 

#### Dataset for the sankey 
In the [fourth step](https://observablehq.com/d/287f65b4ed6e3521?collection=@sandraviz/liminal) I created the data files for the sankey. 

#### Sankey investors vs. investments
In the [fifth step](https://observablehq.com/d/0b719034860b8bbb?collection=@sandraviz/liminal) I sketched the sankey idea using d3.js.  

#### Sankey segments vs. investors
In the [sixth step](https://observablehq.com/d/efd395409ebc2dc6?collection=@sandraviz/liminal) I created anthor sankey connectig the solution segments to the investors. I didn't use it in the final visualisation.

### D3.js sankey 
Please check the code in the MAIN.

![alt text](<Image d3.png>)

### React & d3.js sankey 
Please check the code in the BRANCH. 

##### Interactivity button
There are three buttons to choose either from: all investors, only entities or only persons. 
![alt text](<Image 2 - react  .png>)

##### Interactivity hover
When hover over either the bars to the left (investments) or to the right (investors) the select investor and all their investments are highlighted. 
![alt text](<Image 3 - react.png>)
