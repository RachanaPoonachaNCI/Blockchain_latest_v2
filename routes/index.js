var express = require('express');
const getCourses = require('../utils/courses');
const getAboutUs = require('../utils/about');
const getTestimonials = require('../utils/testimonial');
const login = require('../utils/loginUser');
const logout = require('../utils/logoutUser');
const verifyLogin = require('../utils/verifyLogin');
const getSlots = require('../utils/appointment');
const addAppointment = require('../utils/userAppointment');
const checkEnrollment = require('../utils/checkEnroll');
const addEnrollment = require('../utils/enrollUser');

var router = express.Router();


router.get('/', function(req, res, next) {
  getTestimonials(function(err, obj) {
      if (err) {
          console.error('Error:', err);
          return;
      }
      res.render('index', {page_title: "Yoga Studio", testimonial_ids : Object.keys(obj), testimonial_data : obj});
  });
});

router.get('/foodcentral', function(req, res, next) {
    console.log(process.env.FOOD_CENTRAL_API_KEY);
    res.render('foodcentral', {page_title: "Food Data Central", api_key:process.env.FOOD_CENTRAL_API_KEY});
});

router.get('/login', function(req, res, next) {
      res.render('login', {page_title: "Login"});
});

router.post('/status', function(req, res, next) {
  const metamask_address = req.body.address;
  verifyLogin(metamask_address,function(err, result) {
    if (err) {
        console.error('Error:', err);
        return;
    }
    res.status(200).json({message:"Success", status:result, address: metamask_address});
  })
});

router.get('/appointment', function(req, res, next) {
  getSlots(function(err, obj) {
    if (err) {
        console.error('Error:', err);
        return;
    }
    res.render('details', {page_title: "Appointment", slots : obj});
});
});

router.post('/appointment', function(req, res, next) {
  const metamask_address = req.body.address;
  const appointment_data = req.body.data;
  addAppointment({metamask_address,appointment_data},function(err, result) {
      if (err) {
          console.error('Error:', err);
          return;
      }
      res.status(200).json({message:'Success'})  
    });
});

router.post('/check', function(req, res, next) {
  const metamask_address = req.body.address;
  const course_id = req.body.id;
  checkEnrollment({metamask_address,course_id},function(err, result) {
      if (err) {
          console.error('Error:', err);
          return;
      }
      res.status(200).json({message:"Success", status:result, address: metamask_address});
    });
});

router.post('/enroll', function(req, res, next) {
  const metamask_address = req.body.address;
  const enrollment_data = req.body.data;
  addEnrollment({metamask_address,enrollment_data},function(err, result) {
      if (err) {
          console.error('Error:', err);
          return;
      }
      res.status(200).json({message:'Success'})  
    });
});


router.post('/login', function(req, res, next) {
    const metamask_address = req.body.address;
    const exsitingData = req.body.existingData;
    verifyLogin(exsitingData,function(err, result) {
      if (err) {
          console.error('Error:', err);
          return;
      }
      if(result===false){
        login(metamask_address,function(err, obj) {
          if (err) {
              console.error('Error:', err);
              return;
          }
          res.status(200).json({message:"Success",address: metamask_address, redirect : "/"});
      });
      }else{
        res.status(402).json({message:"User already logged in!"});
      }
  })    
});

router.post('/logout', function(req, res, next) {
  const metamask_address = req.body.address;
  console.log(metamask_address)
  verifyLogin(metamask_address,function(err, result) {
    if (err) {
        console.error('Error:', err);
        return;
    }
    if(result===true){
      logout(metamask_address,function(err, obj) {
        if (err) {
            console.error('Error:', err);
            return;
        }
        res.status(200).json({message:"Success",address: metamask_address, redirect : "/"});
    });
    }else{
      res.status(402).json({message:"No user logged in!!"});
    }
  })
});

router.get('/about', function(req, res, next) {
  getAboutUs(function(err, obj) {
      if (err) {
          console.error('Error:', err);
          return;
      }
      res.render('about', {page_title: "About Us", data : obj});
  });
});

router.get('/courses', function(req, res, next) {
  getCourses(function(err, courses) {
      if (err) {
          console.error('Error:', err);
          return;
      }
      res.render('courses', {page_title: "Courses", course_ids : Object.keys(courses), course_data : courses});
  });
});

router.get('/:courseId', function(req, res, next) {
  const courseId = req.params.courseId;
  getCourses(function(err, courses) {
      if (err) {
          console.error('Error:', err);
          return;
      }
      if (Object.keys(courses).includes(courseId)) {
        res.render('description', {
          page_title: courses[courseId].title,
          course_id: courseId,
          course_data: courses[courseId]
        });
      } else {
        res.status(404).send('Page not found');
      }
  });
})

module.exports = router;
