---
slug: "/The-opening"
id: 1
title: 'الافتتاح وعن هذا المشروع المفتوح المصدر'
date: '31-10-2020'
template: 'post'
author: 'مروان احمينة'
description: 'مرحبا،
بحمد الله تم الافتتاح في 31-10-2020
حول المدونة:
ليست لدي خطة لكتابة مقالات تعليمية.. ربما ما أقوم به (إن قمت) هو كتابة مراجعات لأعمالي السابقة (البرمجية). كيف قمت ببعض الخوارزميات وبعض التنظيمات'
keyword: 'LaraGatsby, MyBlog, الإفتتاح,'
---
مرحبا،
بحمد الله تم الإفتتاح في 31-10-2020




![Hello world](./helloworld.png)

## حول المدونة
ليست لدي خطة لكتابة مقالات تعليمية.. ربما ما أقوم به (إن قمت) هو كتابة مراجعات لأعمالي السابقة (البرمجية). كيف قمت ببعض الخوارزميات وبعض التنظيمات. وماذا لو كنت سأبني نفس المشروع: ماهي الأخطاء التي سأتجنبها، ما هي التحسينات التي سأقوم بها..
## عن الموقع وطموحات التطوير
هذا الموقع مفتوح المصدر (مشاعي)، يتكون من واجهة أمامية معمولة بجاتسبي وواجهة خلفية باللارافيل (اللارافيل لل (API. ولحد الآن عملية التطوير لم تنتهي. وأهم ما يوفره:
### يوفر هذا المصدر المفتوح كل من:
    
1. نظام خاص يقوم بربط ارتباط خاص مع أي زائر يزور الموقع لأول مرة. ينتج عن هذا الاحتفاظ ب ال Token للإدارة العمليات في الموقع. وحفظ بيانات ال ip الخاصة بالمستخدم. وأي عملية سيقوم بها المستخدم بعد هذا سيكون الRelationship هو الid الخاص بعملية ربط الارتباط.
2. معرض أعمال: معرض بجاتسبي فقط. يقوم بجلب البيانات عبر ال Graph QL من ملفات json من داخل مجلد portfolio ليعرضها مع صور خاصة بالمشروع.. حيث أن ملف الJson يحتوي على كافة البيانات اللازمة بما في ذلك روابط الصور. أما صور المشروع فيفضل أن تكون في في مجلدات خاصة داخل مجلد ال portfolio (متواجد داخل مجلد src)
3. مدونة: يتم جلب التدوينات من مجلد posts الذي يحتوي على مجلدات بأسماء خاصة تُعرفُ عن المقالات. هذه الأخيرة (المجلدات) تحتوي على الصور وملف للمقال بامتداد md.
4. دعم الأرشفة في محركات البحث SEO (سيتم تطويره أكثر)
5. دعم ال RSS
6. نظام لجلب التدوينات المشابهة: هذا المكون موجود أسفل كل مقال. (سيتم تطويره أكثر)
7. نظام تعليقات أسفل كل مقال يتعامل مع API لارافيل. (إضافة – حذف – تعديل)
8. نظام تأريخ التعليقات المعدلة
9. نظام تسجيل وقت-القراءة لكل مقال معين ولكل زائر معين. عبر الapi. يتم الاحتفاظ بذلك في قاعدة البيانات.
10. نظام يقوم بتسجيل جميع الصفحات والأعمال التي يزورها الزائر.
11. نظام مراسلة القائمين على الموقع: "راسلني". مربوط ب API اللارافيل.

[رابط المشروع على github](https://github.com/AhminaMar1/LaraGatsby)

## تحت التطوير: سأستأنف قريباً رحلة إكمال تطوير كل من:
### تطوير لوحة التحكم وتوفير كل من: (بلارافيل فقط)
1. عرض بيانات المقالات: ساعات القراءة – الزيارات – معدل العودة..
2. عرض بيانات حول كمية زيارة الصفحات/الأعمال.
3. عرض التعليقات وإمكانية حذفها.

### تطوير الواجهة الأمامية:
1. تحسين نظام المقالات ذات صلة (طريقة أفضل أداءً).
2. تحسين الSEO وإتاحة التعرف على الروابط من مواقع التواصل الاجتماعي.
3. بناء نظام أشهر المقالات.
4. بناء نظام الاشتراك في النشرة البريدية.


هذا ما أتذكره الآن، إذا كان لديك أي اقتراح شاركنا به في التعليقات.