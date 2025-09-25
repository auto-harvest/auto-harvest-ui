=== Run information ===

Scheme:       weka.classifiers.meta.FilteredClassifier -F "weka.filters.supervised.instance.SMOTE -C 0 -K 5 -P 53.79 -S 1" -S 1 -W weka.classifiers.trees.J48 -- -C 0.25 -M 2
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

FilteredClassifier using weka.classifiers.trees.J48 -C 0.25 -M 2 on data filtered through weka.filters.supervised.instance.SMOTE -C 0 -K 5 -P 53.79 -S 1

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
J48 pruned tree
------------------

remove = 1
|   char_$ = 1
|   |   free = 1
|   |   |   char_! = 1
|   |   |   |   money = 1
|   |   |   |   |   ooo = 1: emai (2242.0/179.0)
|   |   |   |   |   ooo = 2
|   |   |   |   |   |   our = 1
|   |   |   |   |   |   |   cap_ave <= 2.708: emai (7.0/2.0)
|   |   |   |   |   |   |   cap_ave > 2.708: spam (4.0)
|   |   |   |   |   |   our = 2: spam (11.0/4.0)
|   |   |   |   money = 2
|   |   |   |   |   cap_ave <= 2.645414: emai (26.0/8.0)
|   |   |   |   |   cap_ave > 2.645414: spam (21.0/3.0)
|   |   |   char_! = 2
|   |   |   |   cap_ave <= 2.87
|   |   |   |   |   money = 1: emai (267.0/29.0)
|   |   |   |   |   money = 2: spam (14.0/2.0)
|   |   |   |   cap_ave > 2.87
|   |   |   |   |   our = 1
|   |   |   |   |   |   money = 1
|   |   |   |   |   |   |   cap_ave <= 6.778359: emai (39.0/13.0)
|   |   |   |   |   |   |   cap_ave > 6.778359: spam (13.0/2.0)
|   |   |   |   |   |   money = 2: spam (5.0)
|   |   |   |   |   our = 2
|   |   |   |   |   |   money = 1
|   |   |   |   |   |   |   cap_ave <= 5.635
|   |   |   |   |   |   |   |   cap_ave <= 3.921
|   |   |   |   |   |   |   |   |   cap_ave <= 3.407: emai (4.0/1.0)
|   |   |   |   |   |   |   |   |   cap_ave > 3.407: spam (23.0)
|   |   |   |   |   |   |   |   cap_ave > 3.921: emai (3.0)
|   |   |   |   |   |   |   cap_ave > 5.635: spam (10.0)
|   |   |   |   |   |   money = 2: spam (10.0/1.0)
|   |   |   char_! = 3
|   |   |   |   cap_ave <= 2.653
|   |   |   |   |   ooo = 1
|   |   |   |   |   |   our = 1: emai (144.0/37.0)
|   |   |   |   |   |   our = 2: spam (36.0/16.0)
|   |   |   |   |   ooo = 2: spam (7.0)
|   |   |   |   cap_ave > 2.653: spam (142.0/17.0)
|   |   free = 2
|   |   |   char_! = 1
|   |   |   |   our = 1: emai (100.0/25.0)
|   |   |   |   our = 2: spam (88.0/33.0)
|   |   |   char_! = 2: spam (133.0/35.0)
|   |   |   char_! = 3: spam (225.0/14.0)
|   char_$ = 2
|   |   cap_ave <= 2.292
|   |   |   cap_ave <= 1.602
|   |   |   |   our = 1: emai (17.0)
|   |   |   |   our = 2: spam (5.0)
|   |   |   cap_ave > 1.602
|   |   |   |   char_! = 1
|   |   |   |   |   ooo = 1
|   |   |   |   |   |   free = 1: emai (24.0/10.0)
|   |   |   |   |   |   free = 2: spam (11.0/1.0)
|   |   |   |   |   ooo = 2: spam (13.0)
|   |   |   |   char_! = 2
|   |   |   |   |   money = 1
|   |   |   |   |   |   free = 1: emai (8.0/2.0)
|   |   |   |   |   |   free = 2
|   |   |   |   |   |   |   ooo = 1: spam (7.0/2.0)
|   |   |   |   |   |   |   ooo = 2: emai (3.0/1.0)
|   |   |   |   |   money = 2: spam (17.0/2.0)
|   |   |   |   char_! = 3: spam (34.0/1.0)
|   |   cap_ave > 2.292
|   |   |   char_! = 1
|   |   |   |   money = 1
|   |   |   |   |   cap_ave <= 3.176
|   |   |   |   |   |   cap_ave <= 2.447: spam (3.0/1.0)
|   |   |   |   |   |   cap_ave > 2.447: emai (12.0)
|   |   |   |   |   cap_ave > 3.176
|   |   |   |   |   |   cap_ave <= 8.851: spam (55.0/4.0)
|   |   |   |   |   |   cap_ave > 8.851: emai (8.0/1.0)
|   |   |   |   money = 2: spam (56.0/3.0)
|   |   |   char_! = 2: spam (215.0/6.0)
|   |   |   char_! = 3: spam (312.0/2.0)
remove = 2: spam (1202.0/43.0)

Number of Leaves  : 	42

Size of the tree : 	79


Time taken to build model: 1.22 seconds

=== Stratified cross-validation ===
=== Summary ===

Correctly Classified Instances        4154               90.2847 %
Incorrectly Classified Instances       447                9.7153 %
Kappa statistic                          0.7963
Mean absolute error                      0.1557
Root mean squared error                  0.2853
Relative absolute error                 32.6027 %
Root relative squared error             58.3773 %
Total Number of Instances             4601     

=== Detailed Accuracy By Class ===

                 TP Rate  FP Rate  Precision  Recall   F-Measure  MCC      ROC Area  PRC Area  Class
                 0.873    0.077    0.880      0.873    0.876      0.796    0.928     0.891     spam
                 0.923    0.127    0.918      0.923    0.920      0.796    0.928     0.923     emai
Weighted Avg.    0.903    0.108    0.903      0.903    0.903      0.796    0.928     0.911     

=== Confusion Matrix ===

    a    b   <-- classified as
 1582  231 |    a = spam
  216 2572 |    b = emai

