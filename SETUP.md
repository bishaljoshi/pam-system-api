1. Create Database pam_system
2. Run below command to create user
    - grant all on pam_system.* to root@localhost identified by "password";
3. Import tables from [sql](data/data.sql) to pam_system database
4. Import postman collection and environment from [./data/environment](data/PAM-dev.postman_environment.json) and [./data/collection](data/PAM-System.postman_collection.json)