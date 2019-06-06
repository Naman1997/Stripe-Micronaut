CREATE DATABASE work;

USE work;

CREATE TABLE `charge` (
  `Finger` varchar(45) NOT NULL,
  `id` varchar(45) NOT NULL,
  `Amount` int(11) NOT NULL,
  `BalanceTransaction` varchar(45) NOT NULL,
  `Invoice` varchar(45) DEFAULT NULL,
  `PaymentMethod` varchar(45) NOT NULL,
  `ReceiptNumber` varchar(45) DEFAULT NULL,
  `Currency` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci


CREATE TABLE `refund` (
  `id` varchar(45) NOT NULL,
  `Amount` int(11) DEFAULT NULL,
  `BalanceTransaction` varchar(45) DEFAULT NULL,
  `Charge` varchar(45) DEFAULT NULL,
  `Currency` varchar(45) DEFAULT NULL,
  `Status` varchar(45) DEFAULT NULL,
  `FailureReason` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci