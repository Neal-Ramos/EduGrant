-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 12, 2025 at 05:34 PM
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
-- Table structure for table `admin_accounts`
--

CREATE TABLE `admin_accounts` (
  `adminId` int(255) NOT NULL,
  `adminEmail` varchar(255) DEFAULT NULL,
  `adminPassword` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin_accounts`
--

INSERT INTO `admin_accounts` (`adminId`, `adminEmail`, `adminPassword`) VALUES
(1, 'nealadmin@gmail.com', 'nealadmin');

-- --------------------------------------------------------

--
-- Table structure for table `announcements`
--

CREATE TABLE `announcements` (
  `announcementId` int(255) NOT NULL,
  `announcementTitle` varchar(255) NOT NULL,
  `announcementDate` date NOT NULL,
  `announcementFile` varchar(255) NOT NULL,
  `announcementContent` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `scholarships`
--

CREATE TABLE `scholarships` (
  `scholarshipId` int(255) NOT NULL,
  `scholarshipName` varchar(255) NOT NULL,
  `scholarshipDealine` varchar(255) NOT NULL,
  `scholarshipLogo` varchar(255) NOT NULL,
  `scholarshipCover` varchar(255) NOT NULL,
  `scholarshipApplicationForm` varchar(255) NOT NULL,
  `scholarshipDescription` varchar(255) NOT NULL,
  `scholarshipDocuments` varchar(255) NOT NULL,
  `totalApplicants` int(255) NOT NULL DEFAULT 0,
  `totalApproved` int(255) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `scholarships`
--

INSERT INTO `scholarships` (`scholarshipId`, `scholarshipName`, `scholarshipDealine`, `scholarshipLogo`, `scholarshipCover`, `scholarshipApplicationForm`, `scholarshipDescription`, `scholarshipDocuments`, `totalApplicants`, `totalApproved`) VALUES
(24, 'Win Gachalian', '2025-05-31', 'https://res.cloudinary.com/ddhubrtxy/image/upload/v1746712770/scholarship-files/Win%20Gachalian-Logo-1746712759505-448a438d-a231-434a-bd97-297ace03c990.jpg', 'https://res.cloudinary.com/ddhubrtxy/image/upload/v1746712770/scholarship-files/Win%20Gachalian-Cover-1746712761720-d33d2333-5f97-4cc2-aff4-7dd7109fa57a.jpg', 'https://res.cloudinary.com/ddhubrtxy/raw/upload/v1746712771/scholarship-files/Win%20Gachalian-Form-1746712762515-0279c1b5-5de6-437a-b375-2fd0405edb6d', 'Sigma Boooooooyyyyyyyyyy', '[]', 0, 0),
(25, 'Win Gachalian', '2025-05-31', 'https://res.cloudinary.com/ddhubrtxy/image/upload/v1746712817/scholarship-files/Win%20Gachalian-Logo-1746712806012-9a49053a-7c7e-4f19-8e9d-c7b9643a2497.jpg', 'https://res.cloudinary.com/ddhubrtxy/image/upload/v1746712818/scholarship-files/Win%20Gachalian-Cover-1746712809024-213fc033-9c2c-406e-ab78-91c4466ebf7f.jpg', 'https://res.cloudinary.com/ddhubrtxy/raw/upload/v1746712819/scholarship-files/Win%20Gachalian-Form-1746712809932-dea0a983-be3c-4874-a63e-956ac00aed23', 'Sigma Boooooooyyyyyyyyyy', '[{\"label\":\"Certificate of Registration\"},{\"label\":\"Report Card\"}]', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `scholarships_archive`
--

CREATE TABLE `scholarships_archive` (
  `scholarshipId` int(255) DEFAULT NULL,
  `scholarshipName` varchar(255) DEFAULT NULL,
  `scholarshipDeadline` varchar(255) DEFAULT NULL,
  `scholarshipLogo` varchar(255) DEFAULT NULL,
  `scholarshipCover` varchar(255) DEFAULT NULL,
  `scholarshipDescription` varchar(255) DEFAULT NULL,
  `scholarshipDocuments` varchar(255) DEFAULT NULL,
  `scholarshipApplicants` int(255) DEFAULT NULL,
  `scholarshipApproved` int(255) DEFAULT NULL
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

-- --------------------------------------------------------

--
-- Table structure for table `user_applications`
--

CREATE TABLE `user_applications` (
  `applicationId` int(255) NOT NULL,
  `userId` int(255) DEFAULT NULL,
  `scholarshipId` int(255) DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_applications_approved`
--

CREATE TABLE `user_applications_approved` (
  `applicationId` int(255) DEFAULT NULL,
  `userId` int(255) DEFAULT NULL,
  `scholarshipId` int(255) DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'approved'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_applications_missing`
--

CREATE TABLE `user_applications_missing` (
  `applicationId` int(255) DEFAULT NULL,
  `userId` int(255) DEFAULT NULL,
  `scholarshipId` int(255) DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'missing',
  `missingFiles` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_applications_rejected`
--

CREATE TABLE `user_applications_rejected` (
  `applicationId` int(255) DEFAULT NULL,
  `userId` int(255) DEFAULT NULL,
  `scholarshipId` int(255) DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'rejected'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_accounts`
--
ALTER TABLE `admin_accounts`
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
  ADD KEY `scholarshipId` (`scholarshipId`);

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
-- Indexes for table `user_applications_approved`
--
ALTER TABLE `user_applications_approved`
  ADD KEY `applicationId` (`applicationId`);

--
-- Indexes for table `user_applications_missing`
--
ALTER TABLE `user_applications_missing`
  ADD KEY `applicationId` (`applicationId`);

--
-- Indexes for table `user_applications_rejected`
--
ALTER TABLE `user_applications_rejected`
  ADD KEY `applicationId` (`applicationId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin_accounts`
--
ALTER TABLE `admin_accounts`
  MODIFY `adminId` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `announcements`
--
ALTER TABLE `announcements`
  MODIFY `announcementId` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `scholarships`
--
ALTER TABLE `scholarships`
  MODIFY `scholarshipId` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `security_code`
--
ALTER TABLE `security_code`
  MODIFY `codeId` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=149;

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
-- Constraints for table `user_applications`
--
ALTER TABLE `user_applications`
  ADD CONSTRAINT `user_applications_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user_account` (`userID`),
  ADD CONSTRAINT `user_applications_ibfk_2` FOREIGN KEY (`scholarshipId`) REFERENCES `scholarships` (`scholarshipId`);

--
-- Constraints for table `user_applications_approved`
--
ALTER TABLE `user_applications_approved`
  ADD CONSTRAINT `user_applications_approved_ibfk_1` FOREIGN KEY (`applicationId`) REFERENCES `user_applications` (`applicationId`);

--
-- Constraints for table `user_applications_missing`
--
ALTER TABLE `user_applications_missing`
  ADD CONSTRAINT `user_applications_missing_ibfk_1` FOREIGN KEY (`applicationId`) REFERENCES `user_applications` (`applicationId`);

--
-- Constraints for table `user_applications_rejected`
--
ALTER TABLE `user_applications_rejected`
  ADD CONSTRAINT `user_applications_rejected_ibfk_1` FOREIGN KEY (`applicationId`) REFERENCES `user_applications` (`applicationId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
