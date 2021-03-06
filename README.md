# [Data Journalism and D3](https://shail-shouryya.github.io/D3-data-visualization/)

![Newsroom](https://media.giphy.com/media/v2xIous7mnEYg/giphy.gif)

## Background

Welcome to the newsroom! In this project, we will be analyzing the current trends shaping people's lives, as well as creating charts, graphs, and interactive elements for a major metro paper to help readers understand our findings.

The editor wants us to run a series of feature stories about the health risks facing particular demographics. She's counting on us to sniff out the first story idea by sifting through information from the U.S. Census Bureau and the Behavioral Risk Factor Surveillance System.

The data set we'll use is based on 2014 ACS 1-year estimates: [https://factfinder.census.gov/faces/nav/jsf/pages/searchresults.xhtml](https://factfinder.census.gov/faces/nav/jsf/pages/searchresults.xhtml), but the option to investigate a different data set remains. The current data set incldes data on rates of income, obesity, poverty, etc. by state. MOE stands for "margin of error."

## Our Task

### Level 1: D3 Dabbler

![4-scatter](Images/4-scatter.jpg)

We need to create a scatter plot between two of the data variables such as `Healthcare vs. Poverty` or `Smokers vs. Age`.

Using D3 techniques, create a scatter plot that represents each state with circle elements. We'll code this graphic in the `app.js` file of our directory—making sure to pull in the data from `data.csv` using the `d3.csv` function. Our scatter plot should ultimately appear like the image at the top of this section.

* Include state abbreviations in the circles.

* Create and situate our axes and labels to the left and bottom of the chart.

* Note: We'll need to use <strong>`python -m http.server`</strong> to run the visualization. This will host the page at `localhost:8000` in our web browser.

- - -

### Level 2: Impress the Boss (In Progress)

Why make a static graphic when D3 lets us interact with our data?

![7-animated-scatter](Images/7-animated-scatter.gif)

#### 1. More Data, More Dynamics

We're going to include more demographics and more risk factors, placing additional labels in our scatter plot and giving them click events so that our users can decide which data to display and animating the transitions for our circles' locations as well as the range of our axes. Try this for two risk factors for each axis, or, for an extreme challenge, create three for each axis.

* Hint: Try binding all of the CSV data to the circles. This will allow easy determination of their x or y values by clicking the labels.

#### 2. Incorporate d3-tip

While the ticks on the axes allow us to infer approximate values for each circle, it's impossible to determine the true value without adding another layer of data. Enter tooltips: developers can implement these in their D3 graphics to reveal a specific element's data when the user hovers their cursor over the element. Add tooltips to your circles and display each tooltip with the data that the user has selected. Use the `d3-tip.js` plugin developed by [Justin Palmer](https://github.com/Caged)—we've already included this plugin in your assignment directory.

![8-tooltip](Images/8-tooltip.gif)

* Check out [David Gotz's example](https://bl.ocks.org/davegotz/bd54b56723c154d25eedde6504d30ad7) to see how to implement tooltips with d3-tip.

- - -

## Copyright

Data Boot Camp © 2018. All Rights Reserved.
