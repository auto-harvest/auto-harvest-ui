Let's compare the results of the Naive Bayes classifier when run without SMOTE and with SMOTE, focusing on the algorithm's performance metrics and the insights from the confusion matrix.

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

Export to Sheets

**Summary of Class-Specific Performance:** The most significant impact of SMOTE is on the **"spam" class**. The algorithm is now **more effective at identifying actual spam emails (higher recall for spam)**, which is crucial for a spam filter. This improvement comes with a very minor trade-off: a slight increase in false positives for spam (more legitimate emails being incorrectly flagged as spam), and a minuscule decrease in spam prediction precision. However, the improved precision for "emai" and reduced false positive rate for "emai" (meaning fewer spam emails are _missed_) indicate a more balanced and robust model overall.

---

#### **3. Confusion Matrix Analysis**

The confusion matrix provides the raw counts of predictions versus actuals, offering a clear view of the changes.

||**Actual Spam**|**Actual Emai**|
|:--|:--|:--|
|**Without SMOTE**|||
|Predicted Spam|1250 (TP)|56 (FP)|
|Predicted Emai|563 (FN)|2732 (TN)|
|**With SMOTE**|||
|Predicted Spam|**1331 (TP)**|**66 (FP)**|
|Predicted Emai|**482 (FN)**|**2722 (TN)**|

Export to Sheets

**Analysis of Confusion Matrix:**

- **Increased True Positives (Spam):** The number of spam emails correctly identified increased from 1250 to **1331**. This directly reflects the improved recall for the spam class.
- **Decreased False Negatives (Spam):** The number of spam emails that were _missed_ (classified as legitimate) decreased from 563 to **482**. This is a major benefit, as fewer spam emails will now reach the user's inbox.
- **Slightly Increased False Positives (Spam):** The number of legitimate emails incorrectly classified as spam increased from 56 to **66**. This is the primary trade-off of using SMOTE in this scenario: to catch more spam, a few more legitimate emails might be misclassified. However, given the significant reduction in false negatives, this trade-off is often acceptable in spam filtering where missing spam can be more problematic than an occasional false positive.
- **Slightly Decreased True Negatives (Spam):** The number of legitimate emails correctly identified decreased slightly from 2732 to 2722, which aligns with the small increase in false positives.

---

### **Conclusion**

The comparison clearly indicates that **applying SMOTE significantly enhanced the Naive Bayes classifier's performance for this spam detection task.**

The primary advantage gained from using SMOTE is the **improved ability to identify spam (higher recall for the minority class)**, leading to **fewer missed spam emails**. While there's a slight increase in false positives (legitimate emails incorrectly marked as spam), the overall improvement in accuracy, Kappa statistic, and error metrics, coupled with the substantial reduction in false negatives, demonstrates that **SMOTE was effective in addressing the class imbalance** and making the spam filter more robust and efficient at its primary goal: reducing the amount of spam reaching the user.