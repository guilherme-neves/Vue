function ChamadaDao(connection) {
    this._connection = connection

}


ChamadaDao.prototype.callTrafficAllAgentsPerHours = function (callback) {
    this._connection.query("select distinct user_id,user_login, user_firstname,user_surname, "
        + "	count ( DISTINCT ch_call_id) as \"All Calls\", "
        + "	sum ( case when ch_cc_call_id>0 then 1 else 0 end) as \"CC calls\", "
        + "	sum ( case when ch_cc_call_id<1 then 1 else 0 end) as \"NOT CC calls\", "
        + "	sum ( ch_direction ) as \"Outgoing Calls\", "
        + "	sum ( case ch_direction when 0 then 1 else 0 end) as \"Incoming Calls\", "
        + "	sum (ch_talk_time_seconds) as \"TimeInSeconds\" "
        + " from tblusers,tblcallhistory where  "
        + "	\"ch_start_time\" >= '2018-06-18' /*From date*/  "
        + "	and \"ch_start_time\" <= (\"date\"('2018-06-19') + interval '24 hours') /*to date*/ "
        + "	and \"ch_user_id\" = user_id  "
        + "	and user_is_agent=1 group by 1,2,3,4 "
        + "  order by  user_firstname,user_surname", callback)
}

ChamadaDao.prototype.callTrafficAllQueuesPerHourDaily = function (callback) {
    this._connection.query("select  queue_name,queue_id  "
        + "	from tblcallscc , tblcalls ,tblqueues where "
        + "	\"call_start_time\" >= '2018-06-18' /*From date*/ "
        + "	and \"call_start_time\" <= (\"date\"('2018-06-19') + interval '24 hours') /*to date*/ "
        + "	and \"cc_call_id\" = \"call_id\" "
        + "	and \"cc_queue_id\" = queue_id "
        + " group by  queue_name, queue_id "
        + " order by queue_name", callback)
}


ChamadaDao.prototype.callTrafficAllQueuesPerHourDaily2 = function (callback) {
    this._connection.query("select  count ( \"cc_call_id\") as \"All Calls\", "
        + "	sum( case when cc_talk_time >0 then 1 else 0 end) as \"Answered calls\", "
        + "	sum( case when (cc_talk_time = 0 and cc_agent_id=0 and cc_callback=0) then 1 else 0 end) as \"Abandoned calls\", "
        + "	cc_queue_id "
        + " from tblcallscc, tblcalls where "
        + "	\"call_start_time\" >= '2018-06-18' /*From date*/ "
        + "	and \"call_start_time\" <= (\"date\"('2018-06-19') + interval '24 hours') /*to date*/ "
        + "	and \"cc_call_id\" = \"call_id\" "
        + " group by cc_queue_id", callback)
}


ChamadaDao.prototype.callTrafficAllQueueTimeGosPerHourDaily = function (callback) {
    this._connection.query("select  count ( \"cc_call_id\") as \"All Calls\", "
        + "	max (cc_queue_time),min (cc_queue_time), avg (cc_gos) as \"AVG GOS\",cc_queue_id "
        + "   from tblcallscc, tblcalls where  "
        + "	\"call_start_time\" >= '2018-06-18' /*From date*/ "
        + " 	and \"call_start_time\" <= (\"date\"('2018-06-19') + interval '24 hours') /*to date*/ "
        + " 	and \"cc_call_id\" = \"call_id\" "
        + " group by cc_queue_id", callback)
}

ChamadaDao.prototype.callTrafficAllQueueTimeGosPerHourDaily2 = function (callback) {
    this._connection.query(" select  count ( \"cc_call_id\") as \"All Calls\",  "
        + "	EXTRACT (HOUR FROM \"call_start_time\")||':00 - '||(EXTRACT (HOUR FROM \"call_start_time\")+1)||':00' as \"label\" , "
        + "	\"date\" (\"call_start_time\"),queue_id,max (cc_queue_time),min (cc_queue_time),avg (cc_gos) as \"AVG GOS\" "
        + " from tblcallscc, tblcalls,tblqueues where  "
        + "	\"call_start_time\" >= '2018-06-18' /*From date*/ "
        + "	and \"call_start_time\" <= (\"date\"('2018-06-19') + interval '24 hours') /*to date*/ "
        + "	and \"cc_call_id\" = \"call_id\" "
        + "	and \"cc_queue_id\" = queue_id "
        + "	group by EXTRACT (HOUR FROM \"call_start_time\"),queue_id, \"date\" (\"call_start_time\") "
        + " order by  EXTRACT (HOUR FROM \"call_start_time\")", callback)
}


ChamadaDao.prototype.callTrafficByQueuePerHour = function (callback) {
    this._connection.query(" select  count ( cc1.\"cc_call_id\"), EXTRACT (HOUR FROM c1.\"call_start_time\")||':00 - '||(EXTRACT (HOUR FROM c1.\"call_start_time\")+1)||':00' as \"label\" "
        + "	from tblcallscc cc1, tblcalls c1,tblqueues q1 where "
        + "	c1.\"call_start_time\" >='2018-06-18' "
        + "	and c1.\"call_start_time\" <= (\"date\"('2018-06-19') + interval '24 hours') "
        + "	and cc1.\"cc_call_id\" = c1.\"call_id\" "
        + "	and cc1.\"cc_queue_id\" = q1.\"queue_id\" "
        + "	and q1.\"queue_name\"= 'Suporte Quality' "
        + "	group by EXTRACT (HOUR FROM c1.\"call_start_time\")  "
        + "	order by  EXTRACT (HOUR FROM c1.\"call_start_time\")", callback)
}



ChamadaDao.prototype.callTrafficByQueuePerHourDaily = function (callback) {
    this._connection.query("select \"date\"(c1.\"call_start_time\"), count ( cc1.\"cc_call_id\"), EXTRACT (HOUR FROM c1.\"call_start_time\")||':00 - '||(EXTRACT (HOUR FROM c1.\"call_start_time\")+1)||':00' as \"label\" "
        + "	from tblcallscc cc1, tblcalls c1,tblqueues q1 where "
        + "	c1.\"call_start_time\" >= '2018-06-18' "
        + "	and c1.\"call_start_time\" <= (\"date\"('2018-06-19') + interval '24 hours') "
        + "	and cc1.\"cc_call_id\" = c1.\"call_id\" "
        + "	and cc1.\"cc_queue_id\" = q1.\"queue_id\" "
        + "	and q1.\"queue_name\"= 'Suporte Quality' "
        + " 	group by EXTRACT (HOUR FROM c1.\"call_start_time\"),\"date\"(c1.\"call_start_time\") "
        + "	order by  EXTRACT (HOUR FROM c1.\"call_start_time\")", callback)
}


ChamadaDao.prototype.callTrafficByQueuePerHourDailyDetails = function (callback) {
    this._connection.query("select  count ( \"cc_call_id\") as \"All Calls\",  "
        + "	sum( case when cc_talk_time >0 then 1 else 0 end) as \"Answered calls\", "
        + "	sum( case when (cc_talk_time = 0 and cc_agent_id=0 and cc_callback=0) then 1 else 0 end) as \"Abandoned calls\" "
        + " from tblcallscc, tblcalls,tblqueues where  "
        + "	\"call_start_time\" >= '2018-06-18' /*From date*/ "
        + " 	and \"call_start_time\" <= (\"date\"('2018-06-19') + interval '24 hours') /*to date*/ "
        + " 	and \"cc_call_id\" = \"call_id\" "
        + "	and \"cc_queue_id\" = queue_id "
        + "	and queue_name = 'Suporte Quality'", callback)
}

ChamadaDao.prototype.callTrafficOneAgentPerHourDaily = function (callback) {
    this._connection.query("select  count ( DISTINCT t1.ch_call_id) as \"All Calls\", "
        + "	sum ( case when t1.ch_cc_call_id > 0 then 1 else 0 end ) as \"CC calls\", "
        /*	-- # NOT CC Calls = ( "# all calls" - "# cc calls" ) in the report
          -- OR can be calculated here : */
        + "	sum ( case when t1.ch_cc_call_id > 0 then 0 else 1 end ) as \"NOT CC calls\", "

        + "	sum ( t1.ch_direction ) as \"Outgoing Calls\", "
        /*	-- # Incoming Calls = ("# all calls" - "# outgoing calls") in the report
            -- OR can be calculated here :*/
        + "	sum ( case t1.ch_direction when 0 then 1 else 0 end ) as \"Incoming Calls\", "
        + "	sum (t1.ch_talk_time_seconds) as \"TimeInSeconds\" "
        + " from tblusers,tblcallhistory as t1 where  "
        + "	t1.\"ch_start_time\" >= '2018-06-18' /*From date*/ "
        + " and t1.\"ch_start_time\" <= (\"date\"('2018-06-19') + interval '24 hours') /*to date*/ "
        + "	and t1.\"ch_user_id\" = user_id "
        + "	and user_login = '221' /*User login*/", callback)
}

ChamadaDao.prototype.callTrafficOneAgentPerHourDailyDetails = function (callback) {
    this._connection.query("select count ( DISTINCT t1.ch_call_id) as \"All Calls\", "
        + "	sum ( case when t1.ch_cc_call_id>0 then 1 else 0 end ) as \"CC calls\", "
        /*	-- # NOT CC Calls = ( "# all calls" - "# cc calls" ) in the report
          -- OR can be calculated here : */
        + "	sum ( case when t1.ch_cc_call_id>0 then 0 else 1 end ) as \"NOT CC calls\", "

        + "	sum ( case when t1.ch_cc_call_id>0 then t1.ch_talk_time_seconds else 0 end ) as \"Talk Time CC Calls\", "
        + "	sum ( case when t1.ch_cc_call_id<1 then t1.ch_talk_time_seconds else 0 end ) as \"Talk Time Direct Calls\", "

        + "	sum ( t1.ch_direction ) as \"Outgoing Calls\", "
        /*-- # Incoming Calls = ("# all calls" - "# outgoing calls") in the report
        -- OR can be calculated here :  */
        + "	sum ( case t1.ch_direction when 0 then 1 else 0 end) as \"Incoming Calls\", "
        + "	sum (t1.ch_talk_time_seconds) as \"TimeInSeconds\" from tblusers, tblcallhistory as t1 where "
        + "	t1.\"ch_start_time\" >= '2018-06-18' /*From date*/ "
        + " 	and t1.\"ch_start_time\" <= (\"date\"('2018-06-18') + interval '24 hours') /*to date*/ "
        + "	and t1.\"ch_user_id\" = user_id "
        + " and user_login = '221' /*User login*/", callback)
}

ChamadaDao.prototype.callTraffiCOneQueueTimeGosPerHourDaily = function (callback) {
    this._connection.query("select  count ( \"cc_call_id\") as \"All Calls\", "
        + "	max (cc_queue_time),min (cc_queue_time),avg (cc_gos) as \"AVG GOS\" "
        + " from tblcallscc, tblcalls,tblqueues where  "
        + "	\"call_start_time\" >= '2018-06-18' /*From date*/ "
        + "	and \"call_start_time\" <= (\"date\"('2018-06-19') + interval '24 hours') /*to date*/ "
        + "	and \"cc_call_id\" = \"call_id\" "
        + "	and \"cc_queue_id\" = queue_id "
        + "	and queue_name = 'Suporte Quality'", callback)
}

ChamadaDao.prototype.callTraffiCOneQueueTimeGosPerHourDaily2 = function (callback) {
    this._connection.query("select  distinct \"date\" (\"call_start_time\"), "
        + " avg (cc_gos) as \"avg_gos\" from tblcallscc , tblcalls ,tblqueues where "
        + "	\"call_start_time\" >= '2018-06-18' /*From date*/ "
        + "	and \"call_start_time\" <= (\"date\"('2018-06-19') + interval '24 hours') /*to date*/"
        + "	and \"cc_call_id\" = \"call_id\" "
        + "	and \"cc_queue_id\" = queue_id "
        + "	and queue_name = 'Suporte Quality' "
        + " GROUP BY \"date\" (\"call_start_time\") "
        + " order by  \"date\" (\"call_start_time\")", callback)
}


module.exports = function () {
    return ChamadaDao
}