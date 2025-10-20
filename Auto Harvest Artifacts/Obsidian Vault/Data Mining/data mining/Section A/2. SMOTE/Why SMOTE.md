
### **Comparison: Naive Bayes (Without SMOTE) vs. Naive Bayes (With SMOTE)**

Both experiments utilize the **Naive Bayes classification algorithm** on the same email dataset, evaluated using **10-fold cross-validation**. The key difference is the application of **SMOTE (Synthetic Minority Over-sampling Technique)** in the second run, which aims to balance the class distribution by generating synthetic samples for the minority class ("spam").

---

#### **1. Overall Performance Metrics**

| Metric                               | Without SMOTE | With SMOTE    | Observation                                                                 |
| :----------------------------------- | :------------ | :------------ | :-------------------------------------------------------------------------- |
| **Correctly Classified Instances**   | 86.55% (3982) | 88.09% (4053) | **Improved:** SMOTE led to a **1.54% increase** in overall accuracy.        |
| **Incorrectly Classified Instances** | 13.45% (619)  | 11.91% (548)  | **Improved:** Fewer misclassifications.                                     |
| **Kappa Statistic**                  | 0.7038        | 0.7402        | **Improved:** Stronger agreement, indicating better reliability.            |
| **Mean Absolute Error (MAE)**        | 0.1435        | 0.1353        | **Improved:** Lower error, meaning predictions are closer to actual values. |
| **Root Mean Squared Error (RMSE)**   | 0.3311        | 0.3154        | **Improved:** Lower error, indicating better fit.                           |

Export to Sheets

**Summary of Overall Performance:** The version of the Naive Bayes algorithm with SMOTE clearly **outperforms** the version without SMOTE across all general performance metrics. This indicates that balancing the dataset with synthetic samples led to a more accurate and reliable model.

---

#### **2. Detailed Accuracy by Class**

This section highlights the trade-offs and improvements for each class ("spam" and "emai").

|Metric|Class|Without SMOTE|With SMOTE|Observation|
|:--|:--|:--|:--|:--|
|**TP Rate (Recall)**|spam|0.689|**0.734**|**Improved:** SMOTE significantly increased spam detection (more actual spam caught).|
||emai|**0.980**|0.976|**Slightly Decreased:** Very slight reduction in legitimate email recall, but still very high.|
|**FP Rate**|spam|**0.020**|0.024|**Slightly Increased:** A small increase in legitimate emails incorrectly flagged as spam (false alarms).|
||emai|0.311|**0.266**|**Improved:** Fewer missed spam emails (actual spam classified as legitimate).|
|**Precision**|spam|**0.957**|0.953|**Slightly Decreased:** Still very high, but a tiny drop in confidence when predicting spam.|
||emai|0.829|**0.850**|**Improved:** Higher confidence when predicting legitimate emails.|
|**F-Measure**|spam|0.802|**0.829**|**Improved:** Better balance between precision and recall for spam.|
||emai|0.898|**0.909**|**Improved:** Overall stronger performance for legitimate emails.|
|**ROC Area**|spam|0.944|0.944|**No Change:** Excellent discriminative power maintained.|
||emai|0.944|0.944|**No Change:** Excellent discriminative power maintained.|
|**PRC Area**|spam|0.929|0.929|**No Change:** Maintained strong performance in imbalanced context for spam.|
||emai|0.946|0.946|**No Change:** Maintained strong performance in imbalanced context for emai.|
