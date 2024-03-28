# Image-Picker-Full-Stack-MERN-App
Created a MERN based full stack app ,where we have some set of tourist places which stored at backend and through http based api calls from frontend in react getting images and showing to users and from that user can select images and will update the same to backend  based on user selection and if we want to delete selected place ,we can delete.

App is divided into two Sections , upper section conatins **Places that user like to visit** , storing user selected places , places which user is selecting from all available places. 
![image](https://github.com/hemant110800/Image-Picker-Full-Stack-MERN-App/assets/48346161/7c2ab5a3-07e3-4461-9992-aa4c29da67e1)

Bottom section of App contains all Available Places that we are fetching from backend and showing in below part
![image](https://github.com/hemant110800/Image-Picker-Full-Stack-MERN-App/assets/48346161/0e9ae63a-76bb-4801-8856-84f1a72b13f7)

#**Functional behaviour**
1)Adding Image
If user want to select any image from Available Places area , they can do so by simply clikcking on place card , for user engagement added basic animation effecton on hover of cards. Handling case if Place is already selected , will not again update in upper area.

2)Removing Image
If user want to remove any place from selected area (upper area) they can do so by again clicking on Image card from upper area , will give popup to user for confirmation with progress-bar , if in time they cancel the selected place it will not delete from selected places area else it will delete.
![image](https://github.com/hemant110800/Image-Picker-Full-Stack-MERN-App/assets/48346161/0cf39d61-31b1-4d7a-b1eb-e91727ac2801)

#**Tech Used** 
Front-end :- React ( Along with react concepts and hooks, explored custom-hooks and use to get available places from backend in different components) , tried react project creation with Vite.
Backend :- NodeJS, ExpressJS (Created get, put Apis to provide all places and updating user selected places) , Storing data in json files at server end.
