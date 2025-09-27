=== Run information ===

Scheme:       weka.classifiers.meta.FilteredClassifier -F "weka.filters.supervised.instance.SMOTE -C 0 -K 5 -P 53.79 -S 1" -S 1 -W weka.classifiers.trees.RandomForest -- -P 100 -I 100 -num-slots 1 -K 0 -M 1.0 -V 0.001 -S 1
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

FilteredClassifier using weka.classifiers.trees.RandomForest -P 100 -I 100 -num-slots 1 -K 0 -M 1.0 -V 0.001 -S 901156035 on data filtered through weka.filters.supervised.instance.SMOTE -C 0 -K 5 -P 53.79 -S 1

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
RandomForest

Bagging with 100 iterations and base learner

weka.classifiers.trees.RandomTree -K 0 -M 1.0 -V 0.001 -S 901156035 -do-not-check-capabilities

Time taken to build model: 1.64 seconds

=== Stratified cross-validation ===
=== Summary ===

Correctly Classified Instances        4058               88.1982 %
Incorrectly Classified Instances       543               11.8018 %
Kappa statistic                          0.7549
Mean absolute error                      0.1356
Root mean squared error                  0.3024
Relative absolute error                 28.3971 %
Root relative squared error             61.8871 %
Total Number of Instances             4601     

=== Detailed Accuracy By Class ===

                 TP Rate  FP Rate  Precision  Recall   F-Measure  MCC      ROC Area  PRC Area  Class
                 0.874    0.113    0.834      0.874    0.854      0.756    0.936     0.915     spam
                 0.887    0.126    0.916      0.887    0.901      0.756    0.936     0.937     emai
Weighted Avg.    0.882    0.121    0.884      0.882    0.882      0.756    0.936     0.928     

=== Confusion Matrix ===

    a    b   <-- classified as
 1585  228 |    a = spam
  315 2473 |    b = emai

