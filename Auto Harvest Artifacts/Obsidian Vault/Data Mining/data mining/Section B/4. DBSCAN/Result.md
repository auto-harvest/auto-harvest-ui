=== Run information ===

Scheme:       weka.clusterers.DBSCAN -E 1.41434 -M 4 -A "weka.core.EuclideanDistance -R first-last"
Relation:     StudentsPerformance
Instances:    1000
Attributes:   17
              gender=male
              race/ethnicity=group B
              race/ethnicity=group C
              race/ethnicity=group A
              race/ethnicity=group D
              race/ethnicity=group E
              parental level of education=bachelor's degree
              parental level of education=some college
              parental level of education=master's degree
              parental level of education=associate's degree
              parental level of education=high school
              parental level of education=some high school
              lunch=free/reduced
              test preparation course=completed
              math score
              reading score
              writing score
Test mode:    evaluate on training data


=== Clustering model (full training set) ===

DBSCAN clustering results
========================================================================================

Clustered DataObjects: 1000
Number of attributes: 17
Epsilon: 1.41434; minPoints: 4
Distance-type: 
Number of generated clusters: 7
Elapsed time: .05

(   0.) 0,1,0,0,0,0,1,0,0,0,0,0,0,0,72,72,74                                   -->  0
...
( 999.) 0,0,0,0,1,0,0,1,0,0,0,0,1,0,77,86,86                                   -->  0



Time taken to build model (full training data) : 0.05 seconds

=== Model and evaluation on training set ===

Clustered Instances

0      741 ( 75%)
1       37 (  4%)
2       48 (  5%)
3      123 ( 12%)
4       12 (  1%)
5       22 (  2%)
6        8 (  1%)

Unclustered instances : 9