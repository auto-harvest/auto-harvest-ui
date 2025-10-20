=== Run information ===

  

Scheme:       weka.classifiers.meta.FilteredClassifier -F "weka.filters.supervised.instance.SMOTE -C 0 -K 5 -P 54.0 -S 1" -S 1 -W weka.classifiers.bayes.NaiveBayes

Relation:     spam_train_num_exam-weka.filters.unsupervised.attribute.NumericToNominal-R2-8

Instances:    4601

Attributes:   9

              cap_ave

              remove

              ooo

              money

              free

              our

              char_$

              char_!

              class

Test mode:    10-fold cross-validation

  

=== Classifier model (full training set) ===

  

FilteredClassifier using weka.classifiers.bayes.NaiveBayes  on data filtered through weka.filters.supervised.instance.SMOTE -C 0 -K 5 -P 54.0 -S 1

  

Filtered Header

@relation spam_train_num_exam-weka.filters.unsupervised.attribute.NumericToNominal-R2-8-weka.filters.supervised.instance.SMOTE-C0-K5-P54.0-S1

  

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

Naive Bayes Classifier

  

                Class

Attribute        spam   emai

                (0.5)  (0.5)

=============================

cap_ave

  mean          9.5385 2.3826

  std. dev.    47.9266 5.1123

  weight sum      2792   2788

  precision     0.3655 0.3655

  

remove

  1             1633.0 2746.0

  2             1161.0   44.0

  [total]       2794.0 2790.0

  

ooo

  1             2069.0 2770.0

  2              725.0   20.0

  [total]       2794.0 2790.0

  

money

  1             1912.0 2745.0

  2              882.0   45.0

  [total]       2794.0 2790.0

  

free

  1             1477.0 2613.0

  2             1317.0  177.0

  [total]       2794.0 2790.0

  

our

  1             1118.0 2224.0

  2             1676.0  566.0

  [total]       2794.0 2790.0

  

char_$

  1             1465.0 2702.0

  2             1329.0   88.0

  [total]       2794.0 2790.0

  

char_!

  1              716.0 2288.0

  2              869.0  339.0

  3             1210.0  164.0

  [total]       2795.0 2791.0

  

  

  

Time taken to build model: 0.88 seconds

  

=== Stratified cross-validation ===

=== Summary ===

  

Correctly Classified Instances        4053               88.0895 %

Incorrectly Classified Instances       548               11.9105 %

Kappa statistic                          0.7402

Mean absolute error                      0.1353

Root mean squared error                  0.3154

Relative absolute error                 28.3252 %

Root relative squared error             64.5518 %

Total Number of Instances             4601     

  

=== Detailed Accuracy By Class ===

  

                 TP Rate  FP Rate  Precision  Recall   F-Measure  MCC      ROC Area  PRC Area  Class

                 0.734    0.024    0.953      0.734    0.829      0.755    0.944     0.929     spam

                 0.976    0.266    0.850      0.976    0.909      0.755    0.944     0.946     emai

Weighted Avg.    0.881    0.170    0.890      0.881    0.877      0.755    0.944     0.939     

  

=== Confusion Matrix ===

  

    a    b   <-- classified as

 1331  482 |    a = spam

   66 2722 |    b = emai