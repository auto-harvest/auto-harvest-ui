### 1. Introduction

This section details the application of hierarchical clustering to the `StudentsPerformance` dataset, aiming to identify natural groupings or segments within the student population based on their demographic characteristics and academic scores. Understanding these inherent structures can provide insights into diverse student profiles.

### 2. Methodology

The clustering analysis was conducted using the Weka data mining software. The `StudentsPerformance` dataset, comprising 1000 instances and 17 attributes, was subjected to a hierarchical clustering algorithm (`weka.clusterers.HierarchicalClusterer`).

Before applying the clustering algorithm, a crucial preprocessing step was performed using the `weka.filters.unsupervised.attribute.NominalToBinary` filter. This filter converted all nominal (categorical) attributes, such as `gender`, `race/ethnicity`, `parental level of education`, `lunch`, and `test preparation course`, into binary (0 or 1) attributes. This transformation was essential to ensure compatibility with the chosen distance metric, as Euclidean Distance operates on numerical data. The numerical attributes (`math score`, `reading score`, `writing score`) were retained in their original format.

The hierarchical clustering model was configured with the following parameters:

- **Number of Clusters (-N):** The analysis was set to identify 9 clusters.
- **Linkage Method (-L):** Single Linkage was employed. Under this method, the distance between two clusters is defined as the minimum distance between any single data point in one cluster and any single data point in the other cluster. This method is sensitive to outliers and often forms elongated clusters.
- **Distance Function (-A):** Euclidean Distance (`weka.core.EuclideanDistance`) was selected to measure the dissimilarity between instances, utilizing all attributes from first to last (`-R first-last`).

The clustering model was built and evaluated on the full training dataset.

### 3. Results

The hierarchical clustering algorithm successfully partitioned the 1000 student instances into 9 clusters. The distribution of instances across these clusters is presented in Table 1.

**Table 1: Distribution of Instances Across Hierarchical Clusters**

| Cluster ID | Number of Instances | Percentage of Total Instances (%) |
| :--------- | :------------------ | :-------------------------------- |
| 0          | 826                 | 83.0                              |
| 1          | 2                   | 0.2                               |
| 2          | 3                   | 0.3                               |
| 3          | 123                 | 12.3                              |
| 4          | 8                   | 0.8                               |
| 5          | 12                  | 1.2                               |
| 6          | 22                  | 2.2                               |
| 7          | 1                   | 0.1                               |
| 8          | 3                   | 0.3                               |
| **Total**  | **1000**            | **100.0**                         |





### 4. Discussion

The hierarchical clustering analysis revealed a highly uneven distribution of students across the identified 9 clusters.

A **dominant cluster, Cluster 0, emerged as the largest group, encompassing 826 instances (83%)** of the entire dataset. This indicates that a vast majority of the students in the dataset share a high degree of similarity in their combined demographic and performance characteristics as measured by Euclidean distance.

**Cluster 3 is the second most substantial group, containing 123 instances (12.3%)**. This suggests a secondary, albeit smaller, distinct student profile within the data.

Conversely, a number of **very small clusters were identified**:

- Clusters 1 and 8 each contain only 2 and 3 instances, respectively.
- Cluster 2 also has only 3 instances.
- Cluster 7 is a singleton cluster, containing just 1 instance.

These small clusters likely represent **outliers or highly unique student profiles** that are significantly different from the majority. Their isolation in separate clusters, especially with single linkage clustering which is prone to "chaining" and can highlight outliers, suggests they possess distinct combinations of attributes (e.g., extremely high/low scores, unusual demographic combinations) that set them apart.

To gain a more profound understanding of these clusters, a subsequent step would involve **characterizing the attributes of the instances within each cluster**. This would entail analyzing the average `math score`, `reading score`, and `writing score` for each cluster, as well as the most prevalent `gender`, `race/ethnicity`, `parental level of education`, `lunch` type, and `test preparation course` status. Such characterization would illuminate the specific features that define each student segment and explain why these particular groupings were formed.