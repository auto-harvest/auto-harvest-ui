To determine the optimal number of clusters for the **k-means algorithm**, the **Elbow Method** was applied. This method is based on analyzing the **within-cluster sum of squared errors (SSE)** as the number of clusters increases.

The SSE values for different values of k (from 2 to 6) were as follows:

| Number of Clusters (k) | SSE     |
| ---------------------- | ------- |
| 2                      | 2185.71 |
| 3                      | 1865.86 |
| 4                      | 1768.29 |
| 5                      | 1673.81 |
| 6                      | 1575.27 |
It is observed that the **SSE drops significantly from k=2 to k=3**, but after that, the decrease becomes **progressively smaller**, indicating an **“elbow” point around k=3 or k=4**.

Increasing the number of clusters excessively may lead to overfitting and reduced generalization of the model. For this reason, and based on the curve's inflection point, it was decided that **3 or 4 clusters** is the most suitable choice for this dataset.