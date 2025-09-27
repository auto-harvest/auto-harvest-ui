=== Run information ===

Scheme:       weka.classifiers.meta.FilteredClassifier -F "weka.filters.supervised.instance.SMOTE -C 0 -K 5 -P 53.79 -S 1" -S 1 -W weka.classifiers.lazy.IBk -- -K 1 -W 0 -A "weka.core.neighboursearch.LinearNNSearch -A \"weka.core.EuclideanDistance -R first-last\""
Relation:     spam_train_num_exam-weka.filters.unsupervised.attribute.NumericToNominal-R2-8
Instances:    4601
Attributes:   9
              cap_ave
              remove
              ooo
              money
              free
              our
              char_$
              char_!
              class
Test mode:    10-fold cross-validation

=== Classifier model (full training set) ===

FilteredClassifier using weka.classifiers.lazy.IBk -K 1 -W 0 -A "weka.core.neighboursearch.LinearNNSearch -A \"weka.core.EuclideanDistance -R first-last\"" on data filtered through weka.filters.supervised.instance.SMOTE -C 0 -K 5 -P 53.79 -S 1

Filtered Header
@relation spam_train_num_exam-weka.filters.unsupervised.attribute.NumericToNominal-R2-8-weka.filters.supervised.instance.SMOTE-C0-K5-P53.79-S1

@attribute cap_ave numeric
@attribute remove {1,2}
@attribute ooo {1,2}
@attribute money {1,2}
@attribute free {1,2}
@attribute our {1,2}
@attribute char_$ {1,2}
@attribute char_! {1,2,3}
@attribute class {spam,emai}

@data


Classifier Model
IB1 instance-based classifier
using 1 nearest neighbour(s) for classification


Time taken to build model: 1.33 seconds

=== Stratified cross-validation ===
=== Summary ===

Correctly Classified Instances        4014               87.2419 %
Incorrectly Classified Instances       587               12.7581 %
Kappa statistic                          0.7353
Mean absolute error                      0.13  
Root mean squared error                  0.348 
Relative absolute error                 27.228  %
Root relative squared error             71.2115 %
Total Number of Instances             4601     

=== Detailed Accuracy By Class ===

                 TP Rate  FP Rate  Precision  Recall   F-Measure  MCC      ROC Area  PRC Area  Class
                 0.864    0.122    0.821      0.864    0.842      0.736    0.886     0.811     spam
                 0.878    0.136    0.909      0.878    0.893      0.736    0.886     0.893     emai
Weighted Avg.    0.872    0.130    0.874      0.872    0.873      0.736    0.886     0.861     

=== Confusion Matrix ===

    a    b   <-- classified as
 1567  246 |    a = spam
  341 2447 |    b = emai

