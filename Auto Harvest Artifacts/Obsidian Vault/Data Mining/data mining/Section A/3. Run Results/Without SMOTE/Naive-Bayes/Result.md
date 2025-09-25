=== Run information ===

Scheme:       weka.classifiers.meta.FilteredClassifier -F "weka.filters.AllFilter " -S 1 -W weka.classifiers.bayes.NaiveBayes
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

FilteredClassifier using weka.classifiers.bayes.NaiveBayes  on data filtered through weka.filters.AllFilter 

Filtered Header
@relation spam_train_num_exam-weka.filters.unsupervised.attribute.NumericToNominal-R2-8-weka.filters.AllFilter

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
Attribute        spam   emai
               (0.39) (0.61)
=============================
cap_ave
  mean          9.5229  2.376
  std. dev.    49.8271 5.1132
  weight sum      1813   2788
  precision       0.51   0.51

remove
  1             1050.0 2746.0
  2              765.0   44.0
  [total]       1815.0 2790.0

ooo
  1             1327.0 2770.0
  2              488.0   20.0
  [total]       1815.0 2790.0

money
  1             1229.0 2745.0
  2              586.0   45.0
  [total]       1815.0 2790.0

free
  1              954.0 2613.0
  2              861.0  177.0
  [total]       1815.0 2790.0

our
  1              726.0 2224.0
  2             1089.0  566.0
  [total]       1815.0 2790.0

char_$
  1              949.0 2702.0
  2              866.0   88.0
  [total]       1815.0 2790.0

char_!
  1              469.0 2288.0
  2              564.0  339.0
  3              783.0  164.0
  [total]       1816.0 2791.0



Time taken to build model: 0 seconds

=== Stratified cross-validation ===
=== Summary ===

Correctly Classified Instances        3982               86.5464 %
Incorrectly Classified Instances       619               13.4536 %
Kappa statistic                          0.7038
Mean absolute error                      0.1435
Root mean squared error                  0.3311
Relative absolute error                 30.041  %
Root relative squared error             67.7558 %
Total Number of Instances             4601     

=== Detailed Accuracy By Class ===

                 TP Rate  FP Rate  Precision  Recall   F-Measure  MCC      ROC Area  PRC Area  Class
                 0.689    0.020    0.957      0.689    0.802      0.725    0.944     0.929     spam
                 0.980    0.311    0.829      0.980    0.898      0.725    0.944     0.946     emai
Weighted Avg.    0.865    0.196    0.880      0.865    0.860      0.725    0.944     0.939     

=== Confusion Matrix ===

    a    b   <-- classified as
 1250  563 |    a = spam
   56 2732 |    b = emai

