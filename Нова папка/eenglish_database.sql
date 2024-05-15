-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Час створення: Трв 09 2024 р., 16:27
-- Версія сервера: 10.4.32-MariaDB
-- Версія PHP: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База даних: `eenglish_database`
--

-- --------------------------------------------------------

--
-- Структура таблиці `attempts_to_pass_topic_test`
--

CREATE TABLE `attempts_to_pass_topic_test` (
  `attempt_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `topic_test_id` int(11) NOT NULL,
  `attempt_result` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Структура таблиці `topic_information`
--

CREATE TABLE `topic_information` (
  `topic_id` int(11) NOT NULL,
  `topic_name` int(11) NOT NULL,
  `topic_creator_information` int(11) NOT NULL,
  `topic_main_information` int(11) NOT NULL,
  `topic_test_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Структура таблиці `topic_test_information`
--

CREATE TABLE `topic_test_information` (
  `topic_test_id` int(11) NOT NULL,
  `topic_question_one` text NOT NULL,
  `topic_answer_one` text NOT NULL,
  `topic_question_two` text NOT NULL,
  `topic_answer_two` text NOT NULL,
  `topic_question_three` text NOT NULL,
  `topic_answer_three` text NOT NULL,
  `topic_question_four` text NOT NULL,
  `topic_answer_four` text NOT NULL,
  `topic_question_five` text NOT NULL,
  `topic_answer_five` text NOT NULL,
  `topic_question_six` text NOT NULL,
  `topic_answer_six` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Структура таблиці `user_information`
--

CREATE TABLE `user_information` (
  `user_id` int(11) NOT NULL,
  `user_name` varchar(35) NOT NULL,
  `user_surname` varchar(35) NOT NULL,
  `user_gender` varchar(20) NOT NULL,
  `user_login` varchar(30) NOT NULL,
  `user_password` varchar(30) NOT NULL,
  `user_permition_level` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп даних таблиці `user_information`
--

INSERT INTO `user_information` (`user_id`, `user_name`, `user_surname`, `user_gender`, `user_login`, `user_password`, `user_permition_level`) VALUES
(0, '321', '32232', '', 'dsdsa', 'dsadw22', 1),
(3, '32', '32', '', 'ds', 'ds', 1),
(125, '3213', '2131', '', '2321', '3213', 1),
(126, '321312', '32', '', '13213', '12321', 1),
(127, '123', '123', '', '123', '123', 1),
(128, 'Назарій', 'Москалюк', '', 'testlogin', 'testpassword', 2),
(137, '1', '1', '', '1', '1', 2),
(138, '3213', '3213', '', '3213', '3213', 2),
(139, '332', '332', '', '332', '332', 2),
(140, '321321', '321321', '', '321321', '321321', 1),
(141, '321321321', '321321321', '', '321321321', '32132131', 1),
(142, '3333', '33333', '', '3333', '33333333', 1),
(143, '9', '9', 'Хлопець', '9', '9', 1),
(144, '99', '99', 'Хлопець', '99', '99', 1),
(145, '88', '88', 'Дівчина', '88', '88', 1);

--
-- Індекси збережених таблиць
--

--
-- Індекси таблиці `attempts_to_pass_topic_test`
--
ALTER TABLE `attempts_to_pass_topic_test`
  ADD PRIMARY KEY (`attempt_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `topic_test_id` (`topic_test_id`);

--
-- Індекси таблиці `topic_information`
--
ALTER TABLE `topic_information`
  ADD PRIMARY KEY (`topic_id`),
  ADD KEY `topic_test_id` (`topic_test_id`);

--
-- Індекси таблиці `topic_test_information`
--
ALTER TABLE `topic_test_information`
  ADD PRIMARY KEY (`topic_test_id`);

--
-- Індекси таблиці `user_information`
--
ALTER TABLE `user_information`
  ADD PRIMARY KEY (`user_id`);

--
-- Обмеження зовнішнього ключа збережених таблиць
--

--
-- Обмеження зовнішнього ключа таблиці `attempts_to_pass_topic_test`
--
ALTER TABLE `attempts_to_pass_topic_test`
  ADD CONSTRAINT `attempts_to_pass_topic_test_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_information` (`user_id`),
  ADD CONSTRAINT `attempts_to_pass_topic_test_ibfk_2` FOREIGN KEY (`topic_test_id`) REFERENCES `topic_test_information` (`topic_test_id`);

--
-- Обмеження зовнішнього ключа таблиці `topic_information`
--
ALTER TABLE `topic_information`
  ADD CONSTRAINT `topic_information_ibfk_1` FOREIGN KEY (`topic_test_id`) REFERENCES `topic_test_information` (`topic_test_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
