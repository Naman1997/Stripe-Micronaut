CREATE DATABASE work;

USE work;

CREATE TABLE `charge`(`id` varchar(45) NOT NULL, `Amount` int(11) NOT NULL, `BalanceTransaction` varchar(45) NOT NULL, `Invoice` varchar(45) DEFAULT NULL, `PaymentMethod` varchar(45) NOT NULL, `ReceiptNumber` varchar(45) DEFAULT NULL, PRIMARY KEY (`id`));