# T05: Multi-chart Webpage with D3.js

This repository contains a responsive dashboard featuring four different types of charts built with D3.js. The charts explore datasets related to TV energy consumption and historical spot power prices in Australia.

## Dashboard Features:
1. **Scatter Plot:** Energy consumption vs. star rating.
2. **Line Chart:** Average spot power prices (1998-2024).
3. **Bar Chart:** Mean energy consumption for 55-inch TVs by screen technology.
4. **Donut Chart:** Overall energy consumption across all TVs by screen technology.

Each chart is modularized into its own JavaScript file and placed within a responsive CSS grid layout.

index.html: The main HTML structure that creates a responsive grid layout to host the four D3 charts.

style.css: Contains CSS rules to ensure the dashboard is visually appealing and responsive across different screen sizes.

scatter.js: D3.js script generating a scatter plot to visualize the relationship between TV energy consumption and star ratings.

line.js: D3.js script plotting a line chart of the historical average spot power prices from 1998 to 2024.

bar.js: D3.js script rendering a vertical bar chart comparing the mean energy consumption of 55-inch TVs by screen technology.

donut.js: D3.js script generating a donut chart to show the proportion of energy consumption across all TVs based on screen technology.

data/: Directory containing all the CSV datasets used to generate the charts.