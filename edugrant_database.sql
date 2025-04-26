-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 26, 2025 at 06:21 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `edugrant_database`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_account`
--

CREATE TABLE `admin_account` (
  `adminId` int(255) NOT NULL,
  `adminEmail` varchar(255) DEFAULT NULL,
  `adminPassword` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `announcements`
--

CREATE TABLE `announcements` (
  `announcementId` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `scholarships`
--

CREATE TABLE `scholarships` (
  `scholarshipId` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `scholarships_archive`
--

CREATE TABLE `scholarships_archive` (
  `archiveId` int(255) NOT NULL,
  `scholarshipId` int(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `scholarships_reports`
--

CREATE TABLE `scholarships_reports` (
  `reportId` int(255) NOT NULL,
  `userId` int(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `security_code`
--

CREATE TABLE `security_code` (
  `codeId` int(255) NOT NULL,
  `origin` varchar(255) NOT NULL,
  `receiver` varchar(255) NOT NULL,
  `code` varchar(255) DEFAULT NULL,
  `expiryDate` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_account`
--

CREATE TABLE `user_account` (
  `userID` int(255) NOT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `middleName` varchar(255) NOT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `userEmail` varchar(255) DEFAULT NULL,
  `userPassword` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `contactNumber` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `birthDay` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_account`
--

INSERT INTO `user_account` (`userID`, `firstName`, `middleName`, `lastName`, `userEmail`, `userPassword`, `gender`, `contactNumber`, `address`, `birthDay`) VALUES
(21, 'Neal', 'Juliano', 'Ramos', 'nealramos72@gmail.com', '$2b$10$A.Dz2EDQqnhkmD8xtmchH.wN4A6WlhJWX6V8jh3iz/.BewAWdydta', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_applications`
--

CREATE TABLE `user_applications` (
  `applicationId` int(255) NOT NULL,
  `userId` int(255) DEFAULT NULL,
  `scholarshipId` int(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_account`
--
ALTER TABLE `admin_account`
  ADD PRIMARY KEY (`adminId`);

--
-- Indexes for table `announcements`
--
ALTER TABLE `announcements`
  ADD PRIMARY KEY (`announcementId`);

--
-- Indexes for table `scholarships`
--
ALTER TABLE `scholarships`
  ADD PRIMARY KEY (`scholarshipId`);

--
-- Indexes for table `scholarships_archive`
--
ALTER TABLE `scholarships_archive`
  ADD PRIMARY KEY (`archiveId`),
  ADD KEY `scholarshipId` (`scholarshipId`);

--
-- Indexes for table `scholarships_reports`
--
ALTER TABLE `scholarships_reports`
  ADD PRIMARY KEY (`reportId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `security_code`
--
ALTER TABLE `security_code`
  ADD PRIMARY KEY (`codeId`);

--
-- Indexes for table `user_account`
--
ALTER TABLE `user_account`
  ADD PRIMARY KEY (`userID`);

--
-- Indexes for table `user_applications`
--
ALTER TABLE `user_applications`
  ADD PRIMARY KEY (`applicationId`),
  ADD KEY `userId` (`userId`),
  ADD KEY `scholarshipId` (`scholarshipId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin_account`
--
ALTER TABLE `admin_account`
  MODIFY `adminId` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `announcements`
--
ALTER TABLE `announcements`
  MODIFY `announcementId` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `scholarships`
--
ALTER TABLE `scholarships`
  MODIFY `scholarshipId` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `scholarships_archive`
--
ALTER TABLE `scholarships_archive`
  MODIFY `archiveId` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `scholarships_reports`
--
ALTER TABLE `scholarships_reports`
  MODIFY `reportId` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `security_code`
--
ALTER TABLE `security_code`
  MODIFY `codeId` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- AUTO_INCREMENT for table `user_account`
--
ALTER TABLE `user_account`
  MODIFY `userID` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `user_applications`
--
ALTER TABLE `user_applications`
  MODIFY `applicationId` int(255) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `scholarships_archive`
--
ALTER TABLE `scholarships_archive`
  ADD CONSTRAINT `scholarships_archive_ibfk_1` FOREIGN KEY (`scholarshipId`) REFERENCES `scholarships` (`scholarshipId`);

--
-- Constraints for table `scholarships_reports`
--
ALTER TABLE `scholarships_reports`
  ADD CONSTRAINT `scholarships_reports_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user_account` (`userID`);

--
-- Constraints for table `user_applications`
--
ALTER TABLE `user_applications`
  ADD CONSTRAINT `user_applications_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user_account` (`userID`),
  ADD CONSTRAINT `user_applications_ibfk_2` FOREIGN KEY (`scholarshipId`) REFERENCES `scholarships` (`scholarshipId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
