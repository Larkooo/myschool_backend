/* eslint-disable max-len */
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import {Announcement, Homework, User} from "./interfaces";

admin.initializeApp();


// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

export const onSchoolAnnouncement = functions.firestore.document("/schools/{schoolUid}/announcements/{announcementUid}").onCreate(async (snap, context) => {
  const announcement = snap.data() as Announcement;
  const authorRef:admin.firestore.DocumentReference = announcement.author;

  const author = (await admin.firestore().collection("users").doc(authorRef.id).get()).data() as User;

  admin.messaging().sendToTopic(context.params.schoolUid, {
    notification: {
      title: `${author.firstName} a posté une annonce`,
      body: announcement.content,
      clickAction: "FLUTTER_NOTIFICATION_CLICK",
      // badge: "1",
    },
    data: {
      type: "announce",
      click_action: "FLUTTER_NOTIFICATION_CLICK",
      announcementUid: context.params.announcementUid,
    },
  });
});

export const onGroupAnnouncement = functions.firestore.document("/schools/{schoolUid}/groups/{groupUid}/announcements/{announcementUid}").onCreate(async (snap, context) => {
  const announcement = snap.data() as Announcement;
  const authorRef:admin.firestore.DocumentReference = announcement.author;

  const author = (await admin.firestore().collection("users").doc(authorRef.id).get()).data() as User;

  admin.messaging().sendToTopic(context.params.schoolUid + "-" + context.params.groupUid, {
    notification: {
      title: `${author.firstName} a posté une annonce`,
      body: announcement.content,
      clickAction: "FLUTTER_NOTIFICATION_CLICK",
      // badge: "0",
    },
    data: {
      type: "announce",
      click_action: "FLUTTER_NOTIFICATION_CLICK",
      announcementUid: context.params.announcementUid,
    },
  });
});

export const onGroupHomework = functions.firestore.document("/schools/{schoolUid}/groups/{groupUid}/homeworks/{homeworkUid}").onCreate(async (snap, context) => {
  const homework = snap.data() as Homework;
  const authorRef:admin.firestore.DocumentReference = homework.author;

  const author = (await admin.firestore().collection("users").doc(authorRef.id).get()).data() as User;

  admin.messaging().sendToTopic(context.params.schoolUid + "-" + context.params.groupUid, {
    notification: {
      title: `${author.firstName} a posté un nouveau devoir`,
      body: homework.description,
      clickAction: "FLUTTER_NOTIFICATION_CLICK",
      // badge: "1",
    },
    data: {
      type: "homework",
      click_action: "FLUTTER_NOTIFICATION_CLICK",
      homeworkUid: context.params.homeworkUid,
    },
  });
});
