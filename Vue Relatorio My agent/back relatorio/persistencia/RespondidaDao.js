

function RespondidaDao(connection) {
    this._connection = connection
}

RespondidaDao.prototype.answeredCallsAlertTimes = function (callback) {
    this._connection.query("select \"date\"(c.call_start_time) as \"Date of Call\", "
        + "	sum ( cc.cc_pickup_time) as \"Total\" "
        + " from tblcallscc cc,tblcalls c,tblusers u, tblswitches s "
        + " where  c.call_start_time  >= '2018-06-18' "
        + " and c.call_start_time  <= (\"date\"('2018-06-20') + interval '24 hours') "
        + " and cc.cc_call_id = c.call_id "
        + " and cc.cc_talk_time > 0 "
        + " and cc.cc_agent_id= u.user_id "
        + " and u.user_login = '221' "
        + " group by \"date\"(c.call_start_time) order by \"date\"(c.call_start_time) ", callback)
}


RespondidaDao.prototype.answeredCallsAlertTimesAllAgents = function (callback) {
    this._connection.query("select  "
        + "	sum ( cc.cc_pickup_time) as \"Total\",u.user_firstname,u.user_surname,u.user_login "
        + " from tblcallscc cc,tblcalls c,tblusers u, tblswitches s "
        + " where  c.call_start_time  >= '2018-06-18' "
        + " and c.call_start_time  <= (\"date\"('2018-06-20') + interval '24 hours') "
        + " and cc.cc_talk_time > 0 and cc.cc_call_id=c.call_id "
        + " and cc.cc_agent_id= u.user_id "
        + " and u.user_is_agent=1 "
        + " group by u.user_firstname,u.user_surname,u.user_login "
        + " order by u.user_firstname,u.user_surname,u.user_login", callback)
}

RespondidaDao.prototype.answeredCallsLertTimesDetails = function (callback) {
    this._connection.query("select distinct cc.cc_call_id,\"date\"(c.call_start_time) as \"Date of Call\", "
        + "  \"time\"(c.call_start_time) as \"Start Time\", "
        + " \"time\"(c.call_start_time) + \"interval\"(cc.cc_queue_time || ' seconds')  as \"End Time\", "
        + " cc.cc_pickup_time "
        + " from tblcallscc cc,tblcalls c,tblusers u, tblswitches s "
        + " where  c.call_start_time  >= '2018-06-18' "
        + " and c.call_start_time  <= (\"date\"('2018-06-20') + interval '24 hours') "
        + " and cc.cc_call_id = c.call_id "
        + " and cc.cc_talk_time > 0 "
        + " and cc.cc_agent_id= u.user_id "
        + " and u.user_login = '221' "
        + " order by \"time\"(c.call_start_time)", callback)
}

RespondidaDao.prototype.answeredCallsAlertTimesDetailsTotal = function (callback) {
    this._connection.query("select sum (cc.cc_pickup_time) as \"Total Waiting Time\" "
        + "	from tblcallscc cc,tblcalls c,tblusers u, tblswitches s "
        + " where  c.call_start_time  >= '2018-06-18' "
        + " and c.call_start_time  <= (\"date\"('2018-06-20') + interval '24 hours') "
        + " and cc.cc_talk_time > 0 and cc.cc_call_id=c.call_id "
        + " and cc.cc_agent_id= u.user_id and u.user_login = '221'", callback)
}





RespondidaDao.prototype.answeredCallsPerHour = function (callback) {
    this._connection.query("select  count ( c1.\"call_id\" ) as \"count\", EXTRACT (HOUR FROM c1.\"call_start_time\")||':00 - '||(EXTRACT (HOUR FROM c1.\"call_start_time\")+1)||':00' as \"label\" "
        + "	from tblcallscc cc1, tblcalls c1,tblswitches s where "
        + "	c1.\"call_start_time\" >= '2018-06-18' "
        + "	and c1.\"call_start_time\" <= (\"date\"('2018-06-20') + interval '24 hours') "
        + "	and cc1.\"cc_call_id\" = c1.\"call_id\" and cc1.\"cc_talk_time\" > 0 "
        + " group by EXTRACT (HOUR FROM c1.\"call_start_time\")  "
        + " order by  EXTRACT (HOUR FROM c1.\"call_start_time\")", callback)
}


RespondidaDao.prototype.answeredCallsStatistics = function (callback) {
    this._connection.query("SELECT  distinct tblqueues.\"queue_name\", "
        + "	count (cc.\"cc_call_id\") as \"Count of answered calls\", "
        + "	max (cc.\"cc_queue_time\") as \"Max Queue Time\",  "
        + "	max (cc.\"cc_pickup_time\") as \"Max PickUP Time\", "
        + "	sum (cc.\"cc_talk_time\") as \"Talk Time\", "
        + "	(SELECT count (tblcallscc.\"cc_call_id\") "
        + "	FROM tblcalls, tblcallscc , tblqueues q "
        + "	where  \"date\"(tblcalls.\"call_start_time\") >= \"date\"('2018-06-18') "
        + "		and \"date\"(tblcalls.\"call_start_time\") <= \"date\"('2018-06-20') "
        + "		and \"time\"(tblcalls.\"call_start_time\") >= \"time\"(to_timestamp('00:00:00', 'HH24:MI:SS')) "
        + "		and \"time\"(tblcalls.\"call_start_time\") <= \"time\"(to_timestamp('23:59:00', 'HH24:MI:SS')) "
        + "		and tblcallscc.\"cc_queue_id\" = q.\"queue_id\" "
        + "		and tblqueues.\"queue_name\"=q.\"queue_name\" "
        + "		and tblcalls.\"call_id\" = tblcallscc.\"cc_call_id\" "
        + "		and tblcallscc.\"cc_queue_time\" >= 0 "
        + "		and tblcallscc.\"cc_queue_time\" < 31 "
        + "		and tblcallscc.\"cc_talk_time\" > 0) as \"Count0to30\", "
        + "	(SELECT count (tblcallscc.\"cc_call_id\")  "
        + "	FROM tblcalls, tblcallscc , tblqueues q "
        + "	where  \"date\"(tblcalls.\"call_start_time\") >= \"date\"('2018-06-18') "
        + "		and \"date\"(tblcalls.\"call_start_time\") <= \"date\"('2018-06-20') "
        + "		and \"time\"(tblcalls.\"call_start_time\") >= \"time\"(to_timestamp('00:00:00', 'HH24:MI:SS')) "
        + "		and \"time\"(tblcalls.\"call_start_time\") <= \"time\"(to_timestamp('23:59:00', 'HH24:MI:SS')) "
        + "		and tblcallscc.\"cc_queue_id\" = q.\"queue_id\" "
        + "		and tblqueues.\"queue_name\"=q.\"queue_name\" "
        + "		and tblcalls.\"call_id\" = tblcallscc.\"cc_call_id\" "
        + "		and tblcallscc.\"cc_queue_time\" > 30 "
        + "		and tblcallscc.\"cc_queue_time\" < 61 "
        + "		and tblcallscc.\"cc_talk_time\" > 0) as \"Count31to60\", "
        + "	(SELECT count (tblcallscc.\"cc_call_id\") "
        + "	FROM tblcalls, tblcallscc , tblqueues q "
        + "	where  \"date\"(tblcalls.\"call_start_time\") >= \"date\"('2018-06-18') "
        + "		and \"date\"(tblcalls.\"call_start_time\") <= \"date\"('2018-06-20') "
        + "		and \"time\"(tblcalls.\"call_start_time\") >= \"time\"(to_timestamp('00:00:00', 'HH24:MI:SS')) "
        + "		and \"time\"(tblcalls.\"call_start_time\") <= \"time\"(to_timestamp('23:59:00', 'HH24:MI:SS')) "
        + "		and tblcallscc.\"cc_queue_id\" = q.\"queue_id\" "
        + "		and tblqueues.\"queue_name\"=q.\"queue_name\" "
        + "		and tblcalls.\"call_id\" = tblcallscc.\"cc_call_id\" "
        + "		and tblcallscc.\"cc_queue_time\" > 60 "
        + "		and tblcallscc.\"cc_queue_time\" < 91 "
        + "		and tblcallscc.\"cc_talk_time\" > 0) as \"Count61to90\", "
        + "	(SELECT count (tblcallscc.\"cc_call_id\")  "
        + "	FROM tblcalls, tblcallscc , tblqueues q "
        + "	where  \"date\"(tblcalls.\"call_start_time\") >= \"date\"('2018-06-18') "
        + "		and \"date\"(tblcalls.\"call_start_time\") <= \"date\"('2018-06-20') "
        + "		and \"time\"(tblcalls.\"call_start_time\") >= \"time\"(to_timestamp('00:00:00', 'HH24:MI:SS')) "
        + "		and \"time\"(tblcalls.\"call_start_time\") <= \"time\"(to_timestamp('23:59:00', 'HH24:MI:SS')) "
        + "		and tblcallscc.\"cc_queue_id\" = q.\"queue_id\" "
        + "		and tblqueues.\"queue_name\"=q.\"queue_name\" "
        + "		and tblcalls.\"call_id\" = tblcallscc.\"cc_call_id\" "
        + "		and tblcallscc.\"cc_queue_time\" > 90 "
        + "		and tblcallscc.\"cc_queue_time\" < 121 "
        + "		and tblcallscc.\"cc_talk_time\" > 0) as \"Count91to120\", "
        + "	(SELECT count (tblcallscc.\"cc_call_id\")  "
        + "	FROM tblcalls, tblcallscc , tblqueues q  "
        + "	where  \"date\"(tblcalls.\"call_start_time\" ) >= \"date\"('2018-06-18') "
        + "		and \"date\"(tblcalls.\"call_start_time\") <= \"date\"('2018-06-20') "
        + "		and \"time\"(tblcalls.\"call_start_time\") >= \"time\"(to_timestamp('00:00:00', 'HH24:MI:SS')) "
        + "	and \"time\"(tblcalls.\"call_start_time\") <= \"time\"(to_timestamp('23:59:00', 'HH24:MI:SS')) "
        + "		and tblcallscc.\"cc_queue_id\" = q.\"queue_id\" "
        + "		and tblqueues.\"queue_name\"=q.\"queue_name\" "
        + "		and tblcalls.\"call_id\" = tblcallscc.\"cc_call_id\" "
        + "	and tblcallscc.\"cc_queue_time\" > 120 "
        + "	and tblcallscc.\"cc_queue_time\" < 301 "
        + "	and tblcallscc.\"cc_talk_time\" > 0) as \"Count121to300\", "
        + "	(SELECT count (tblcallscc.\"cc_call_id\") "
        + "	FROM tblcalls, tblcallscc , tblqueues q "
        + "	where  \"date\"(tblcalls.\"call_start_time\") >= \"date\"('2018-06-18') "
        + "	and \"date\"(tblcalls.\"call_start_time\") <= \"date\"('2018-06-20') "
        + "	and \"time\"(tblcalls.\"call_start_time\") >= \"time\"(to_timestamp('00:00:00', 'HH24:MI:SS')) "
        + "	and \"time\"(tblcalls.\"call_start_time\") <= \"time\"(to_timestamp('23:59:00', 'HH24:MI:SS')) "
        + "	and tblcallscc.\"cc_queue_id\" = q.\"queue_id\" "
        + "	and tblqueues.\"queue_name\"=q.\"queue_name\" "
        + "	and tblcalls.\"call_id\" = tblcallscc.\"cc_call_id\" "
        + "	and tblcallscc.\"cc_queue_time\" > 300 "
        + "	and tblcallscc.\"cc_talk_time\" > 0) as \"Count300up\", "
        + "	(SELECT count (tblcallscc.\"cc_call_id\") FROM tblcalls, tblcallscc , tblqueues q "
        + "	where  \"date\"(tblcalls.\"call_start_time\") >= \"date\"('2018-06-18') "
        + "		and \"date\"(tblcalls.\"call_start_time\") <= \"date\"('2018-06-20') "
        + "	and \"time\"(tblcalls.\"call_start_time\") >= \"time\"(to_timestamp('00:00:00', 'HH24:MI:SS')) "
        + "	and \"time\"(tblcalls.\"call_start_time\") <= \"time\"(to_timestamp('23:59:00', 'HH24:MI:SS')) "
        + "	and tblcallscc.\"cc_queue_id\" = q.\"queue_id\" "
        + " and tblqueues.\"queue_name\"=q.\"queue_name\" "
        + "	and tblcalls.\"call_id\" = tblcallscc.\"cc_call_id\") as \"Total Calls\" "

        + " FROM tblcalls, tblcallscc cc, tblqueues "
        + " where  \"date\"(tblcalls.\"call_start_time\") >= \"date\"('2018-06-18') "
        + "	and \"date\"(tblcalls.\"call_start_time\") <= \"date\"('2018-06-20') "
        + "	and \"time\"(tblcalls.\"call_start_time\") >= \"time\"(to_timestamp('00:00:00', 'HH24:MI:SS')) "
        + "	and \"time\"(tblcalls.\"call_start_time\") <= \"time\"(to_timestamp('23:59:00', 'HH24:MI:SS')) "
        + "	and tblcalls.\"call_id\" = cc.\"cc_call_id\" "
        + "	and cc.\"cc_talk_time\" > 0 "
        + "	and cc.\"cc_queue_id\" = tblqueues.\"queue_id\" "
        + " GROUP BY tblqueues.\"queue_name\" ORDER BY tblqueues.\"queue_name\" ", callback)
}

RespondidaDao.prototype.answeredCallsWrapupInformation = function (callback) {
    this._connection.query("select  cc.\"cc_call_id\"  , \"time\"(tblcalls.\"call_start_time\") as call_start_time,tblqueues.queue_id, "
        + "	\"date\"(tblcalls.\"call_start_time\"), "
        + "	u.\"user_login\", cc.\"cc_agent_id\", "
        + "	getprotectedcallnumber(getcallnumber(tblcalls.\"call_calling_number\")) as call_calling_number, "
        + "	case when  cc.\"cc_call_id\" IN (select ccw.ccw_cc_id from tblccwrapups ccw) then "
        + "	getwrapup( cc.\"cc_call_id\") "
        + "	else ' - - - ' end as  wrapup_description, "
        + "	cc_contact_firstname, cc_contact_surname, cc_contact_company "
        + " from tblcallscc cc left outer join tblusers u on cc.\"cc_agent_id\" = u.\"user_id\" , tblcalls left outer join tblcontactcache on call_contact_cache_id=cc_entry_id,tblqueues,tblswitches s "
        + " where \"date\"(tblcalls.\"call_start_time\") >= \"date\"('2018-06-18') /*From date*/ "
        + "	and \"date\"(tblcalls.\"call_start_time\") <= \"date\"('2018-06-20') /*To date*/ "
        + "	and \"time\"(tblcalls.\"call_start_time\") >= \"time\"(to_timestamp('00:00:00', 'HH24:MI:SS')) /*from time*/ "
        + "	and \"time\"(tblcalls.\"call_start_time\") <= \"time\"(to_timestamp('23:59:00', 'HH24:MI:SS')) /*to time*/ "
        + "	and cc.\"cc_call_id\" = tblcalls.\"call_id\" "
        + "	and cc.\"cc_talk_time\" > 0  "
        + "	and cc.\"cc_queue_id\" = tblqueues.queue_id "
        + " order by tblcalls.\"call_start_time\" ", callback)
}


RespondidaDao.prototype.answeredCallsWrapupInformation2 = function (callback) {
    this._connection.query("select cc.\"cc_call_id\"  , \"time\"(tblcalls.\"call_start_time\") as call_start_time,tblqueues.queue_id, "
        + " \"date\"(tblcalls.\"call_start_time\"), "
        + "	u.\"user_login\", cc.\"cc_agent_id\", "
        + "	getprotectedcallnumber(getcallnumber(tblcalls.\"call_calling_number\")) as call_calling_number, "
        + "	case when  cc.\"cc_call_id\" IN (select ccw.ccw_cc_id from tblccwrapups ccw) then "
        + "	getwrapup( cc.\"cc_call_id\") "
        + " 	else ' - - - ' end as  wrapup_description, "
        + "	cc_contact_firstname, cc_contact_surname, cc_contact_company "

        + " from tblcallscc cc left outer join tblusers u on cc.\"cc_agent_id\" = u.\"user_id\" , tblcalls left outer join tblcontactcache on call_contact_cache_id=cc_entry_id,tblqueues,tblswitches s "
        + " where \"date\"(tblcalls.\"call_start_time\") >= \"date\"('2018-06-18') /*From date*/ "
        + "	and \"date\"(tblcalls.\"call_start_time\") <= \"date\"('2018-06-20') /*To date*/ "
        + "	and \"time\"(tblcalls.\"call_start_time\") >= \"time\"(to_timestamp('00:00:00', 'HH24:MI:SS')) /*from time*/ "
        + "	and \"time\"(tblcalls.\"call_start_time\") <= \"time\"(to_timestamp('23:59:00', 'HH24:MI:SS')) /*to time*/ "
        + "	and cc.\"cc_call_id\" = tblcalls.\"call_id\" and cc.\"cc_talk_time\" > 0  "
        + "	and cc.\"cc_queue_id\" = tblqueues.queue_id order by tblcalls.\"call_start_time\"", callback)
}

RespondidaDao.prototype.answeredCallsWrapupInformation3 = function (callback) {
    this._connection.query(" select  distinct \"date\"(tblcalls.\"call_start_time\") as date_of_call, cc.cc_queue_id "
        + " from tblcallscc cc, tblcalls,tblswitches s "
        + " where \"date\"(tblcalls.\"call_start_time\") >= \"date\"('2018-06-18') "
        + " 	and \"date\"(tblcalls.\"call_start_time\") <= \"date\"('2018-06-20') "
        + " 	and \"time\"(tblcalls.\"call_start_time\") >= \"time\"(to_timestamp('00:00:00', 'HH24:MI:SS')) "
        + " 	and \"time\"(tblcalls.\"call_start_time\") <= \"time\"(to_timestamp('23:59:00', 'HH24:MI:SS')) "
        + "	and cc.\"cc_call_id\" = tblcalls.\"call_id\" "
        + " 	and cc.\"cc_talk_time\" > 0 	 "
        + " group by 1,2 order by \"date\"(tblcalls.\"call_start_time\")", callback)
}


module.exports = function () {
    return RespondidaDao
}